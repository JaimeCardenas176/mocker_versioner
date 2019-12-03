"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_base64_1 = require("js-base64");
const request = require("request");
class Consul {
    static loadConsulKey(key) {
        return new Promise(function (resolve, reject) {
            Consul.get(key + "/" + process.env.TGX_DEPLOY_ENV).then((value) => {
                resolve(value);
            }).catch((error) => {
                Consul.get(key + "/default").then((value) => {
                    resolve(value);
                }).catch((error) => {
                    console.log("Error for key " + key);
                    reject(error);
                });
            });
        });
    }
    static sendConsul(options) {
        return new Promise(function (resolve, reject) {
            request(options, function (error, response, body) {
                if (error || !body) {
                    reject("Error getting consul");
                }
                else {
                    let result = js_base64_1.Base64.decode(body[0].Value);
                    resolve(result);
                }
            });
        });
    }
    static get(key, pos = null) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                const consulServers = process.env.TGX_CONSUL_NODES;
                const consulToken = process.env.TGX_CONSUL_TOKEN;
                const nginxUser = process.env.TGX_CONSUL_AUTH_USER;
                const nginxPass = process.env.TGX_CONSUL_AUTH_PASS;
                const servers = consulServers.split(";");
                const basicAuth = "Basic " + js_base64_1.Base64.encode(nginxUser + ":" + nginxPass);
                process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
                if (consulServers && servers) {
                    let i = servers.length;
                    if (pos < 0) {
                        reject("Can not connect with consul");
                    }
                    if (!pos) {
                        pos = i - 1;
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
                    Consul.sendConsul(options).then((value) => {
                        resolve(value);
                    }).catch(() => {
                        Consul.get(key, pos - 1).then((value) => {
                            resolve(value);
                        }).catch((err) => {
                            reject(err);
                        });
                    });
                }
            });
        });
    }
}
exports.Consul = Consul;
//# sourceMappingURL=consul.js.map