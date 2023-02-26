import { TransactionName } from "../cadence";
import process from "./process";

export default interface ICommand {
  id: string;
  type: TransactionName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: Array<any>;
  authorizers: Array<{ kmsResourceId: string; resourceOwnerAddress: string }>;
}

export { process, ICommand };
