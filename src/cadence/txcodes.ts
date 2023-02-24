import { readFileSync } from "fs";
import { join } from "path";

export const read = (path: string): string => {
  return readFileSync(join(__dirname, path), "utf8");
};

// NFT transactions
const NFT_MINT = read("./transactions/nft/admin/mint.cdc");
const NFT_TRANSFER_ADMIN = read("./transactions/nft/admin/transfer_admin.cdc");
const NFT_BURN = read("./transactions/nft/burn.cdc");
const NFT_TRANSFER = read("./transactions/nft/transfer.cdc");

const CREATE_USER_ACCOUNT = read("./transactions/account/create_user_account.cdc")

export { NFT_MINT, NFT_TRANSFER_ADMIN, NFT_BURN, NFT_TRANSFER, CREATE_USER_ACCOUNT };
