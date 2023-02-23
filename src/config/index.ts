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

    return {
        environment,
        port,
        commandTopic,
        eventTopic,
        redisURL,
        keyTTL,
        accessAPI,
        availableKeys
    };
};

export default config;
