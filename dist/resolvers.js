"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getStringApiSchema = require('./tools/graph_mocker/extract_api_schema').getStringApiSchema;
const mocker = require('./tools/graph_mocker/mocker');
function versionedSchema(_apiPath = null) {
    var _schema = "";
    if (_apiPath) {
        _schema = mocker.getStringApiSchema("./graphql-schema", _apiPath);
    }
    else {
        _schema = mocker.getStringSchema("./graphql-schema", null);
    }
    var versionedSchema = {
        Schema: _schema,
        version: '1.0.0',
        adviseMessage: null
    };
    return versionedSchema;
}
exports.resolvers = {
    Query: {
        getSchema: (root, args, context) => versionedSchema(),
        getApiSchema: (root, args, context) => {
            return getStringApiSchema("./graphql-schema", args["apiPath"]);
        }
    },
    AdviseMessageLevel: {
        INFO: 0,
        WARN: 1,
        ERROR: 2
    }
};
//# sourceMappingURL=resolvers.js.map