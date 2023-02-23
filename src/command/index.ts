import { TransactionName } from "../cadence";
import process from "./process";

export default interface ICommand {
  id: string;
  type: TransactionName;
  payload: Array<any>;
  authorizers: Array<{ kmsResourceId: string; resourceOwnerAddress: string }>;
}

export { process, ICommand };
