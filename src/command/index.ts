import process from "./process";
import {TransactionName} from "../cadence";

export default interface ICommand {
    id: string;
    type: TransactionName;
    payload: Array<any>;
    authorizers: Array<{ kmsResourceId: string; resourceOwnerAddress: string; }>;
}

export { process, ICommand };
