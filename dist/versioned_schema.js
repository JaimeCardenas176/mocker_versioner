"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
"""
The Schema with a version code
"""
type VersionedSchema{
    """
    String with the schema
    """
    Schema: String!
    
    """
    String with the commit id from graphql-schema repository
    """
    version: String!

    """
    Advise message with posible error, info or warning
    """
    adviseMessage: AdviseMessage
}

"""
 List of advise messages.
"""
type AdviseMessage {
"""
 AM code: The following codes can be returned:
"""
  code: ID!

"""
 Error description
"""
  description: String!

"""
 Indicates the level of importance of the message: Posible values ERROR WARN INFO
"""
  level: AdviseMessageLevel! 
}


enum AdviseMessageLevel {
    """
     Waringn message.
    """
    WARN
    
    """
     Error message.
    """
    ERROR
    
    """
     Info message.
    """
    INFO
  }
  

type Query{
    getSchema: VersionedSchema!
    getApiSchema(apiPath:String!): VersionedSchema!
}
`;
//# sourceMappingURL=versioned_schema.js.map