import { gql } from "apollo-server-express";

export const typeDefs = gql`
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
    String with the date of the last commit from graphql-schema repository
    """
    date: String!

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
  
type StatusResult{
  status: ID!
  adviseMessage: AdviseMessage
}


type Query{
    getSchema: VersionedSchema!
    getApiSchema(productName: String! apiPath:String!): VersionedSchema!
}

type Mutation{
    refreshBaseSchema: StatusResult!
}
`