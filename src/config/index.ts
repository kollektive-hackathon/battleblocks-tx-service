import dotenv from "dotenv";

dotenv.config();

const env = process.env;

const config = () => {
  // App
  const environment = env.ENVIRONMENT;
  const port = env.PORT;

  // Pub/Sub
  const commandTopic = env.COMMAND_TOPIC;
  const eventTopic = env.EVENT_TOPIC;

  // Redis
  const redisURL = env.REDIS_URL;
  const keyTTL = env.KEY_TTL;

  // Flow
  const accessAPI = env.FLOW_ACCESS_API_URL;

  // Auth
  const availableKeys = env.PROPOSER_KEY_COUNT;
  const adminAuthorizerResourceId = env.GCP_KMS_RESOURCE_NAME;
  const adminAuthorizerAddress = env.ADMIN_AUTHORIZER_ADDR;

  // Contracts - Standard
  const fungibleTokenAddress = env.FUNGIBLE_TOKEN_ADDRESS;
  const nonFungibleTokenAddress = env.NON_FUNGIBLE_TOKEN_ADDRESS;
  const flowTokenAddress = env.FLOW_TOKEN_ADDRESS;
  const metadataViewsAddress = env.METADATA_VIEWS_ADDRESS;

  // Contracts - BattleBlocks
  const battleBlocksNftAddress = env.BATTLEBLOCKS_NFT_ADDRESS;
  const battleBlocksAccountAddress = env.BATTLEBLOCKS_ACCOUNT_ADDRESS;
  const battleBlocksGameAddress = env.BATTLEBLOCKS_NFTP_ADDRESS;

  return {
    environment,
    port,
    commandTopic,
    eventTopic,
    redisURL,
    keyTTL,
    accessAPI,
    availableKeys,
    adminAuthorizerResourceId,
    adminAuthorizerAddress,
    fungibleTokenAddress,
    nonFungibleTokenAddress,
    flowTokenAddress,
    metadataViewsAddress,
    battleBlocksNftAddress,
    battleBlocksAccountAddress,
    battleBlocksGameAddress,
  };
};

export default config;
