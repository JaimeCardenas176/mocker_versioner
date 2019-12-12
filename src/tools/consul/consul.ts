import {Base64} from "js-base64";
import * as request from "request";


export class Consul{

    public static loadConsulKey(key): Promise<string> {
        return new Promise((resolve, reject) => {
            Consul.get(key + "/" + process.env.TGX_DEPLOY_ENV).then((value)=>{
                resolve(value);
            }).catch( (error)=>{
                Consul.get(key + "/default").then((value)=>{
                    resolve(value);
                }).catch((error) => {
                    console.log("Error for key " + key);
                    reject(error);
                });
            });
        });
    }
    
    private static sendConsul(options): Promise<any> {
        return new Promise((resolve, reject) => {
            request(options, function(error, response, body) {
                if (error || !body){
                    reject("Error getting consul");
                }else{
                    let result = Base64.decode(body[0].Value);
                    resolve(result);
                }
            });
        });
    }

    private static  get(key, pos=null): Promise<any> {
        return new Promise((resolve, reject) => {
            const consulServers = process.env.TGX_CONSUL_NODES;
            const consulToken = process.env.TGX_CONSUL_TOKEN;
            const nginxUser = process.env.TGX_CONSUL_AUTH_USER;
            const nginxPass = process.env.TGX_CONSUL_AUTH_PASS;
            const servers = consulServers.split(";");
            const basicAuth = "Basic " +  Base64.encode(nginxUser + ":" + nginxPass);
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
            if (consulServers && servers) {
                let i = servers.length;
                if (pos < 0){
                    reject("Can not connect with consul");
                }
                if (pos == undefined || pos == null){
                    pos = i-1;
                }
                var consulNode = servers[pos];
                if (!consulNode.startsWith("http")) {
                    consulNode = "https://" + consulNode;
                }
                var options = {
                    url: consulNode + "/v1/kv/" + key,
                    headers: {
                        "X-Consul-Token": consulToken,
                        Authorization: basicAuth,
                        "content-type": "application/json",
                        Connection: "Keep-Alive"
                    },
                    method: "GET",
                    json: true,
                    agentOptions: {
                        keepAlive: true,
                        keepAliveMsecs: process.env.KEEP_ALIVE_MSECS
                    },
                    timeout: 10000,
                    body: ""
                };
                Consul.sendConsul(options).then((value)=>{
                    resolve(value);
                }).catch(()=>{
                    Consul.get(key, pos-1).then((value)=>{
                        resolve(value);
                    }).catch((err)=>{
                        reject(err);
                    });
                });
            }
        });
    }
    

}

