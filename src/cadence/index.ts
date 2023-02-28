import config from "../config";
import * as txcodes from "./txcodes";

export enum TransactionName {
  // NFT
  NFT_MINT = "NFT_MINT",
  NFT_TRANSFER_ADMIN = "NFT_TRANSFER_ADMIN",
  // USER
  CREATE_USER_ACCOUNT = "CREATE_USER_ACCOUNT",
  // GAME
  GAME_JOIN = "GAME_JOIN",
  GAME_CREATE = "GAME_CREATE",
  GAME_MOVE = "GAME_MOVE",
}

export const getTransaction = (name: TransactionName): string | ((path: string) => string) => {
  const code = Object.values(txcodes).find(
    (value) => Object.keys(txcodes)[Object.values(txcodes).indexOf(value)] === name,
  );
  if (!code) {
    throw new Error(`Transaction code not found for ${name}`);
  }
  return code;
};

export const getContractAddresses = () => {
  return {
    BattleBlocksAccounts: config().battleBlocksAccountAddress,
    BattleBlocksNFT: config().battleBlocksNftAddress,
    BattleBlocksGame: config().battleBlocksGameAddress,
    FlowToken: config().flowTokenAddress,
    FungibleToken: config().fungibleTokenAddress,
    NonFungibleToken: config().nonFungibleTokenAddress,
    MetadataViews: config().nonFungibleTokenAddress,
  };
};
