const getStringApiSchema = require('./tools/graph_mocker/extract_api_schema').getStringApiSchema;

const mocker = require('./tools/graph_mocker/mocker');


function versionedSchema(){    
    var _schema = "";
    _schema = mocker.getStringSchema("./graphql-schema", null);
    var versionedSchema = {
        Schema:_schema,
        version: '1.0.0',
        date: 'date...',
        adviseMessage: null
    };
    return versionedSchema;
}

export const resolvers = {
    Query: {
        getSchema:(root, args, context) => versionedSchema(),
        getApiSchema: (root, args, context) => {

            return getStringApiSchema("./graphql-schema", {product: args._productName, api: args._apiPath})
        }
        
    }, 
    AdviseMessageLevel:{
        INFO:0,
        WARN:1,
        ERROR:2

    }
}

