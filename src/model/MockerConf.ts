export class MockerConf{
    public token:String;
    private static _instance: MockerConf;

    static get(): MockerConf {
        if (!this._instance) {
            this._instance =  new MockerConf();
        }
        return this._instance;
    }
    

    constructor(){

    }
}