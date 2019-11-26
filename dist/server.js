"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apollo_server_express_1 = require("apollo-server-express");
const versioned_schema_1 = require("./versioned_schema");
const routes_1 = require("./routes");
const resolvers_1 = require("./resolvers");
class Aserver {
    constructor() {
        this.graphServer = new apollo_server_express_1.ApolloServer({
            typeDefs: versioned_schema_1.typeDefs,
            resolvers: resolvers_1.resolvers,
            uploads: false,
            playground: {
                endpoint: '/',
                subscriptionEndpoint: '/'
            },
            tracing: false,
            context: ({ req, res }) => ({
                req: req,
                res: res
            })
        });
        this.express = express();
        this.router = routes_1.router();
        this.path = "/";
        this.port = process.env.PORT || 3000;
        this.express.use(this.path, this.router);
        this.graphServer.applyMiddleware({
            app: this.express,
            path: this.path,
            cors: true,
            bodyParserConfig: true
        });
        this.express.listen(this.port, (err) => {
            if (err) {
                return console.log(err);
            }
            return console.log(`Server is listening on ${this.port}`);
        });
    }
}
exports.default = new Aserver().express;
//# sourceMappingURL=server.js.map