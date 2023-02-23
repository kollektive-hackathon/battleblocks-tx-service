import ICommand from "./index";
import {sendTransaction} from "flow-cadut";
import logger from "../logger";
import { getContractAddresses, getTransaction } from "../cadence";
import {getFreeKey, lockKey, unlockKey} from "../keys";
import {GcpKmsAuthorizer, IAuthorize} from "fcl-gcp-kms-authorizer";
import config from "../config";

const { adminAuthorizerResourceId, adminAuthorizerAddress } = config();

const adminAuthorizer = new GcpKmsAuthorizer(adminAuthorizerResourceId);

const process = async (message: ICommand): Promise<string | null> => {
    // Get the message's transaction code
    const code = getTransaction(message.type);

    // Get contract imports addressMap
    const contractAddresses = getContractAddresses();

    // Get the message's args
    const args = message.payload;

    // Get free proposer key index
    const freeProposerKeyIndex = await getFreeKey();

    // Get resourceIds used for signing
    const authorizers = message.authorizers;

    // If we get a key we can proceed otherwise we go to DLQ
    if (freeProposerKeyIndex) {
        const signers = authorizers.map(authorizer => {
            const kmsAuthorizer = new GcpKmsAuthorizer(authorizer.kmsResourceId);
            return kmsAuthorizer.authorize(authorizer.resourceOwnerAddress, 0)
        });

        // Admin authorizer is always passed last
        const admin = signers[signers.length - 1];

        // Authorize Proposer Key
        const proposer = adminAuthorizer.authorize(adminAuthorizerAddress, freeProposerKeyIndex);

        // Send Transaction
        const [result, err] = await sendTransaction({
            code: code,
            payer: admin,
            signers: signers,
            proposer: proposer,
            args: args,
            limit: 9999,
            addressMap: contractAddresses,
            wait: false,
        });

        if (result) {
            // Lock a key for the keyId and txId
            await lockKey(freeProposerKeyIndex, result);
        } else if (err) {
            // Unlock the proposer key from redis
            await unlockKey(freeProposerKeyIndex);
            logger.log({
                level: "error",
                message: `Error: failed while sending transaction: ${err}, ${err.errorMessage}, ${err.message}`,
            });
            throw new Error("Error sending transaction");
        }

        // Return the txId
        return result;
    } else {
        logger.log({
            level: "error",
            message: `Failed to fetch a free proposer key`,
        });
        throw new Error("Could not fetch proposer key");
    }
};

export default process;
