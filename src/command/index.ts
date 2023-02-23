import process from "./process";
import {TransactionName} from "../cadence";

interface ICommand {
    id: string;
    type: TransactionName;
    payload: Array<any>;
}

export { process, ICommand };
