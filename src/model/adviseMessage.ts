import {AdviseMessgaeLevel} from './adviseMessageLevel';

export class AdviseMessage {
    code: string
    description:string
    level: AdviseMessgaeLevel
    
    constructor(){

    }

    toString(){
        return JSON.stringify(this);
    }
    
}