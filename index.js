const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");
const querystring = require('querystring');
const baseURL = "https://api-na1.staging.niceincontact.com/incontactapi/"
const accesstoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyOjExZTliMzRiLTgwOWUtN2MyMC1hZjU5LTAyNDJhYzExMDAwMiIsInJvbGUiOnsibGVnYWN5SWQiOiJBZG1pbmlzdHJhdG9yIiwic2Vjb25kYXJ5Um9sZXMiOltdLCJpZCI6IjExZTdkYWMwLWMyNmQtNTJkMC1hZjE3LTAyNDJhYzExMDAwNCIsImxhc3RVcGRhdGVUaW1lIjoxNjI1NjY5OTMyMDAwfSwiaWNBZ2VudElkIjoiMzkyMjIxIiwiaXNzIjoiaHR0cHM6XC9cL2F1dGguc3RhZ2luZy5uaWNlLWluY29udGFjdC5jb20iLCJnaXZlbl9uYW1lIjoiTWFuZ2VzaCIsImF1ZCI6ImludGVybmFsQGluY29udGFjdCBpbmMuIiwiaWNTUElkIjoiMTA3Mzc0MTg4NSIsImljQlVJZCI6NDU5OTAwNiwibmFtZSI6Im1hbmdlc2guZ2hvcm1vZGVAbmljZS5jb20iLCJ0ZW5hbnRJZCI6IjExZTdkYWMwLWJlMDEtYmI1MC1iMjAyLTAyNDJhYzExMDAwMyIsImV4cCI6MTYyNTcyNTQ0NywiaWF0IjoxNjI1NzIxODQ3LCJmYW1pbHlfbmFtZSI6Ikdob3Jtb2RlIiwidGVuYW50IjoicGVybV9TTzMyTG9hZF8xMDAwMDUiLCJ2aWV3cyI6e30sImljQ2x1c3RlcklkIjoiU08zMiJ9.aH7TSgq6lqjtK2PRmoYivNPmM5y0O-T1zhS7tY7q-DmvQPCViggSsw_qEy4fq9nwMJIlUp0B8hcrGlQ1blgpO8qegsBnxSu4Qpek5km0bv08pGebUZC4wHLvG5tFIK4wwzn87Dm4zagahLtOSmCdcJIPYmN2apr36uvLPf6MUWQ"

const typeDefs = `
  type Query {
    getAgents (input : GetAgentQueryInput) : [Agent]
  }

  input GetAgentQueryInput {
    updatedSince: String
    isActive: Boolean
    isLocked: Boolean
    searchString: String
    skip: Int
    top: Int
    orderby: String
}

type agentSettings
  {
        wfoWebsiteUrl : String
        wfoWebServiceUrl : String
        wfoApiUrl : String
    }
type Agent {
    agentId: Int
    userName: String
    firstName: String
    userId: String
    emailAddress: String,
    settings : agentSettings
  }
`;

const resolvers = {
  
  Agent: {    
    settings: parent => {
      const agentSettingsUrl = `${baseURL}/services/v20.0/agents/${parent.agentId}/agent-settings`;
      console.log(agentSettingsUrl);
      return fetch(agentSettingsUrl,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json())                
    }
  },
  Query: {    
    getAgents: async (_, { input }) => {
      var inputData = querystring.stringify(input);
      var requestedUri = `${baseURL}/services/v21.0/agents?${inputData}`;
      console.log(requestedUri);
      const response = await fetch(requestedUri,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        });
      return response.json().then(data=> data["agents"]);
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Running a ACD GraphQL API server at http://localhost:4000"));
