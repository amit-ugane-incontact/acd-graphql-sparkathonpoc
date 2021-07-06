import { buildSchema } from 'graphql';

const agentSchema = buildSchema(`
    type Agent {
        agentId: Int
        userName: String
        firstName: String
        userId: String
        emailAddress: String,
        settings : agentSettings
    }

    type AgentResponseData
    {
        totalRecords : Int
        agents : [Agent]
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

    type Query {
        getAgents (input : GetAgentQueryInput) : AgentResponseData 
        getAgentSettings (agentId : Int) : agentSettings                
    }

    type agentSettings
    {
        wfoWebsiteUrl : String
        wfoWebServiceUrl : String
        wfoApiUrl : String
    }    
`);

export default agentSchema;
