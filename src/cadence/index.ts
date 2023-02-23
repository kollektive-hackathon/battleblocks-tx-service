import * as txcodes from "./txcodes";

export enum TransactionName {
    NFT_MINT = "NFT_MINT",
    NFT_TRANSFER_ADMIN = "NFT_TRANSFER_ADMIN",
    NFT_BURN = "NFT_BURN",
    NFT_TRANSFER = "NFT_TRANSFER"
}

export const getTransaction = (name: TransactionName): string | ((path: string) => string) => {
    const code = Object.values(txcodes).find((value) => Object.keys(txcodes)[Object.values(txcodes).indexOf(value)] === name);
    if (!code) {
        throw new Error(`Transaction code not found for ${name}`);
    }
    return code;
};

// TODO load thru env
export const getContractAddresses = () => {
    return {
        battleBlocksNFT: ''
    };
};
