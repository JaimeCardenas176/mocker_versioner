import { AdviseMessage } from "./adviseMessage"

export class StatusResult {
    status: string
    adviseMessage: AdviseMessage

    constructor(){

    }

    toString(){
        return JSON.stringify(this);
    }
}