import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {typeDefs}  from "./versioned_schema";
import { router } from "./routes";

import { resolvers } from "./resolvers";

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
    
        this.express.use(this.path, this.router);
        this.graphServer.applyMiddleware({
          app: this.express,
          path: this.path,
          cors: true,
          bodyParserConfig: true
        });
        
        this.express.listen(this.port, (err: Error) => {
          if (err) {
            return console.log(err);
          }
          return console.log(`Server is listening on ${this.port}`);
        });
    }
}

export default new Aserver().express;