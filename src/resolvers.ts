import {getStringApiSchema} from './tools/graph_mocker/extract_api_schema';
import {getStringSchema} from './tools/graph_mocker/mocker';

import { getDate, getHash } from './extract_git_data/extract_git_data'

import * as background_exec from 'child_process';
import { MockerConf } from './model/MockerConf';


async function addedVersionDateSchema(versionedSchema){
    try{
        versionedSchema.version = await getHash(); 
        versionedSchema.date = await getDate();
        
    } catch(error){
        var adviseMessage =  {
            code: 599,
            description: "Error getting info from graphql github: " + error.toString(),
            level: 2
        }
        if (versionedSchema.adviseMessage){
            versionedSchema.adviseMessage.push(adviseMessage);
        }else{
            versionedSchema.adviseMessage =  adviseMessage;
        }
    }
    return versionedSchema;
}

async function versionedSchema(){    
    let versionedSchema = {
        Schema:'',
        version: '', 
        date: '',
        adviseMessage: null
    };
    try{
        versionedSchema.Schema = getStringSchema(process.env.TGX_SCHEMA_PATH, null);
        versionedSchema = await addedVersionDateSchema(versionedSchema);
    } catch(error){
        
        versionedSchema.adviseMessage =  {
            code: 599,
            description: error.toString(),
            level: 2
        }
    }
    
    return versionedSchema;
}

async function run_git_pull(){
    return new Promise ((resolve, reject) =>{
        background_exec.exec('bash dist/extract_git_data/pull_repo.sh', (err, resp) => {
            let outstr: string = resp;
            if(!err && resp){
                outstr = outstr.trim();
                if(outstr === '0')
                    resolve(true)
            }else{
                reject("Unable to retrieve data from repository")
                              
            }
            
        })
    });
}

async function refreshSchemaResolver(context){
    
    var result = {
        status: "NOK",
        adviseMessage: null
    };
    var mkConf = MockerConf.get();    
    var headers = context.req.headers;
    if ('authorization' in headers){
        try{
            if (headers["authorization"] === mkConf.token){
                if (await run_git_pull()){
                    result.status= "OK"
                }
            }else{
                throw ("You must provide a auth with permissions")
            }
        }catch (error){
            result.adviseMessage = {
                code: 598,
                description:error.toString(),
                level:2
            }
        }
    
    }else{
        result.adviseMessage = {
            code: 599,
            description:"You must provide a correct auth headers",
            level:2
        };
    }
    
    return result;
}


export const resolvers = {
    Query: {
        getSchema:(root, args, context) => versionedSchema(),
        getApiSchema: async (root, args, context) => {
            let versionedSchema = getStringApiSchema(process.env.TGX_SCHEMA_PATH, {product: args.productName, api: args.apiPath})
            versionedSchema = await addedVersionDateSchema(versionedSchema);
            return versionedSchema;
        }
        
    }, 
    Mutation: {
        refreshBaseSchema: (root, args, context) => refreshSchemaResolver(context)
    },
    AdviseMessageLevel:{
        INFO:0,
        WARN:1,
        ERROR:2

    }
}

