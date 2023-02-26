import { readFileSync } from "fs";
import { join } from "path";

export const read = (path: string): string => {
  return readFileSync(join(__dirname, path), "utf8");
};

// NFT
const NFT_MINT = read("./transactions/nft/admin/mint.cdc");
const NFT_TRANSFER_ADMIN = read("./transactions/nft/admin/transfer_admin.cdc");

// GAME
const GAME_JOIN = read("./transactions/game/join_game.cdc");
const GAME_MOVE = read("./transactions/game/make_move.cdc");
const GAME_CREATE = read("./transactions/game/new_game.cdc");

// ACCOUNT
const CREATE_USER_ACCOUNT = read("./transactions/account/create_user_account.cdc");

export {
  // NFT
  NFT_MINT,
  NFT_TRANSFER_ADMIN,
  // ACCOUNT
  CREATE_USER_ACCOUNT,
  // GAME
  GAME_JOIN,
  GAME_CREATE,
  GAME_MOVE,
};
