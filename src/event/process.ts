import logger from "../logger";
import {IEvent} from "./index";

const process = async (message: IEvent) => {
  try {
    // TODO unlock proposal key on redis
  } catch (err) {
    logger.log({
      level: "error",
      message: `Error failed to release key for event: ${message}, ${err}`,
      source: "process.ts",
    });
  }
};

export default process;
