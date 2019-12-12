import { AdviseMessage } from "./adviseMessage"

export class VersionedSchema {
    schema: string
    version: string
    date: string
    adviseMessage: AdviseMessage

    constructor(){

    }

    toString(){
        JSON.stringify(this);
    }
}