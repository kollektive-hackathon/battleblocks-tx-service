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

export {
    NFT_MINT,
    NFT_TRANSFER_ADMIN,
    NFT_BURN,
    NFT_TRANSFER
}