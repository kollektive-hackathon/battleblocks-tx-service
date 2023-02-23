import Redis, { Redis as RedisInterface } from "ioredis";

import config from "../config";

const { redisURL, keyTTL: TTL } = config();

const getFreeKeyLuaScript = `
for i=1, ARGV[1],1 do
  if redis.call("exists", "proposal-key:" .. i) == 0 then
    redis.call("set", "proposal-key:" .. i, i, "EX", ${TTL})
    return i
  end
end
return nil
`;

interface CustomRedis extends RedisInterface {
  getFreeKey(name: string, value: number): number | null;
}

// @ts-ignore
export const redis: CustomRedis = new Redis(redisURL, {
  scripts: {
    getFreeKey: {
      numberOfKeys: 1,
      lua: getFreeKeyLuaScript,
    },
  },
});

const ppk = (keyId: number) => {
  return `proposal-key:${keyId}`;
};

const txk = (txId: string) => {
  return `transaction-key:${txId}`;
};

export const setKey = async (key: string, value: number) => {
  await redis.set(txk(key), value, "EX", TTL);
};

export const deleteKey = async (key: string | number) => {
  let keyId: number;
  switch (typeof key) {
    case "number":
      // Delete the key using the provided keyId
      await redis.del(ppk(key as number));
      break;
    case "string":
      // Extract the keyId from the transaction-key
      keyId = Number(await redis.get(txk(key as string)));
      // Delete the key using the extracted keyId
      await redis.del(ppk(keyId));
      // Delete the transaction-key
      await redis.del(txk(key as string));
      break;
    default:
      // Throw an error if the provided key is not a string or number
      throw new Error("Invalid key type");
  }
};
