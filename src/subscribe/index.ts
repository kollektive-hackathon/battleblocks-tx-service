import { PubSub } from "@google-cloud/pubsub";

import { ICommand, process as processCommand } from "../command";
import config from "../config";
import { IEvent, process as processEvent } from "../event";
import logger from "../logger";

const { commandTopic, eventTopic } = config();

const pubsub = new PubSub();

export function subscribeToPubSub() {
  const commands = pubsub.subscription(commandTopic);

  commands.on("message", async (message) => {
    const data: ICommand = JSON.parse(message.data);
    try {
      logger.log({
        level: "info",
        message: `Transaction command received: ${JSON.stringify(data)}`,
      });
      const txId = await processCommand(data);
      if (txId) {
        try {
          message.ack();
        } catch (error) {
          logger.log({
            level: "warn",
            message: `Error: failed acking message: ${error}, commandId: ${data.id}`,
            source: "sub.ts",
          });
        }
      }
    } catch (error) {
      logger.log({
        level: "error",
        message: `Error: failed processing transaction command: ${data?.id}, ${error}`,
      });
    }
  });

  const events = pubsub.subscription(eventTopic);

  events.on("message", async (message) => {
    const data: IEvent = JSON.parse(message.data);
    try {
      logger.log({
        level: "info",
        message: `Event received ${JSON.stringify(data)}`,
      });
      await processEvent(data);
      try {
        message.ack();
      } catch (error) {
        logger.log({
          level: "warn",
          message: `Error: failed acking message: ${error}, eventId: ${data.transactionId}`,
        });
      }
    } catch (error) {
      logger.log({
        level: "error",
        message: `Error: failed while processing event: ${data}, ${error}`,
      });
    }
  });
}
