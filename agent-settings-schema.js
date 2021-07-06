import { buildSchema } from "graphql";

const agentSettingsSchema = buildSchema(`
type agentSettings
    {
        wfoWebsiteUrl : String
        wfoWebServiceUrl : String
        wfoApiUrl : String
    }
    
    type Query {
        getAgentSettings (agentId : Int) : agentSettings
    }
`);

export default agentSettingsSchema;