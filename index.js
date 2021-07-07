const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");
const querystring = require('querystring');
const baseURL = "http://localhost/InContactAPI/"
const accesstoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJ1c2VyOjExZWJjODJlLWYzY2MtMTBhMC04YWY2LTAyNDJhYzExMDAwMyIsInJvbGUiOnsibGVnYWN5SWQiOiJBZG1pbmlzdHJhdG9yIiwic2Vjb25kYXJ5Um9sZXMiOltdLCJpZCI6IjExZWJjODJkLWM1ZTItYTJlMC04MTk0LTAyNDJhYzExMDAwMiIsImxhc3RVcGRhdGVUaW1lIjoxNjI1NTQ4ODE4MDAwfSwiaWNBZ2VudElkIjoiMTAxMSIsImlzcyI6Imh0dHBzOlwvXC9hdXRoLmRldi5uaWNlLWluY29udGFjdC5jb20iLCJnaXZlbl9uYW1lIjoiTWFuZ2VzaCIsImF1ZCI6ImludGVybmFsQGluY29udGFjdCBpbmMuIiwiaWNTUElkIjoiMjciLCJpY0JVSWQiOjQ2NjksIm5hbWUiOiJNYW5nZXNoQGRvNzIuY29tIiwidGVuYW50SWQiOiIxMWViYzgyZC1iZmU4LTU1MTAtOTBjZC0wMjQyYWMxMTAwMDIiLCJleHAiOjE2MjU3MjM2MzUsImlhdCI6MTYyNTcyMDAzNSwiZmFtaWx5X25hbWUiOiJHaG9ybW9kZSIsInRlbmFudCI6InBlcm1fcHVuZV9hcGlfZG83MjQyMTkyMTMzIiwidmlld3MiOnt9LCJpY0NsdXN0ZXJJZCI6IkRPNzIifQ.UvxvUNkcI4W21AKavqDQ59skDhcs2_ZfcVhDybc07vfmNZOo-EB0iWDBFxIWNICYUTLOAV81GgZgq4m12b3Q1lcMqCgiY202oxhShRc38KzA-Y1g6rzHQDAJWaeOZj_EJSyv0lYRhvdTU34TWDwU-fA9SkxvttV47QZ8opTyu0c"

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
      const agentSettingsUrl = `${baseURL}${parent.settings}`;
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
