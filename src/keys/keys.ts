import config from "../config";
import logger from "../logger";
import { deleteKey, redis, setKey } from "../redis";

const { availableKeys } = config();

const totalProposerKeys = Number(availableKeys);

export const getFreeKey = async () => {
    const allKeys = totalProposerKeys + 1;
    let availableKey: number;
    try {
        availableKey = await redis.getFreeKey("totalKeys", allKeys);

        logger.log({
            level: "info",
            message: `Found an available proposer key: ${availableKey}.`,
            source: "keys.ts",
        });

        return availableKey;
    } catch (err) {
        logger.log({ level: "error", message: `Error: failed while fetching free keys: ${err}`, source: "keys.ts" });
    }
    return null;
};

export const lockKey = async (keyId: number, txId: string) => {
    try {
        await setKey(txId, keyId);

        logger.log({
            level: "info",
            message: `Locking proposer key ${keyId} for transaction ${txId}.`,
            source: "keys.ts",
        });
    } catch (err) {
        logger.log({ level: "error", message: `Error: failed while locking proposer key: ${err}`, source: "keys.ts" });
    }
};

export const unlockKey = async (key: string | number) => {
    try {
        await deleteKey(key);

        logger.log({
            level: "info",
            message: `Unlocking proposer key for ${key}`,
            source: "keys.ts",
        });
    } catch (err) {
        logger.log({
            level: "error",
            message: `Error: failed while trying to unlock key ${key}, ${err}`,
            source: "keys.ts",
        });
    }
};
