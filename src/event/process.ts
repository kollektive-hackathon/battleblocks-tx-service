import { unlockKey } from "../keys";
import logger from "../logger";
import { IEvent } from "./index";

const process = async (message: IEvent) => {
  try {
    await unlockKey(message.transactionId);
  } catch (err) {
    logger.log({
      level: "error",
      message: `Error failed to release key for event: ${message}, ${err}`,
      source: "process.ts",
    });
  }
};

export default process;
