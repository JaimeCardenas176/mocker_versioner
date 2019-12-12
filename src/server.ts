import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs}  from "./versioned_schema";
import { router } from "./routes";
import * as dotenv from 'dotenv';
import * as path from 'path';
import { resolvers } from "./resolvers";
import { Consul } from './tools/consul/consul';
import { MockerConf } from './model/MockerConf';

async function getConsulConfig(): Promise<boolean>{
  var mkConf = MockerConf.get();
  return new Promise((resolve, reject)=>{
    Consul.loadConsulKey('core/apps/mocker_online/token').then((value)=>{
      mkConf.token = value;
      resolve(true)
    }).catch((error)=>{
      reject(error);
    });
  });
}

dotenv.config({ path: path.join(__dirname, "../src/.env") });
class Aserver {
    
    public express: express.Express;
    private router: express.Router;
    private port: any;
    private path: string;
    
    private graphServer: ApolloServer = new ApolloServer({
      typeDefs,
        resolvers,
        uploads: false,

        playground: {
            endpoint: '/',
            subscriptionEndpoint: '/'
        },
        tracing: false,
        context: ({req, res}) => ({
            req: req,
            res: res
        })
    });
    
    constructor(){
        this.express = express();
        this.router = router();
        this.path = "/";
        this.port = process.env.PORT || 3000;
        getConsulConfig().then(()=>{
          this.express.use(this.path, this.router);
          this.graphServer.applyMiddleware({
            app: this.express,
            path: this.path,
            cors: true,
            bodyParserConfig: true
          });

          this.express.listen(this.port, (err: Error) => {
            if (err) {
              console.log(err);
            }
            console.log(`Server is listening on ${this.port}`);
          });  
        }).catch((error)=>{
          console.log("Can not server up cause fail loading consul config:")
          console.log(error.toString())
        });
        
        
      
    }
}

export default new Aserver().express;

// if (status_conf["enable"]){
//     if (!interval_status){
//         interval_status = setInterval(
//             function() {
//                 status_search(endpoints_audit);
//             },
//             status_conf["seconds"]*1000,
//         );
//     }else{
//         clearInterval(interval_status);
//         interval_status = setInterval(
//             function() {
//                 status_search(endpoints_audit);
//             },
//             status_conf["seconds"]*1000,
//         );
//     }
// }else{
//     if (interval_status){
//         clearInterval(interval_status);
//         interval_status=null;
//     }
// }