import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import agentSchema  from './agent-schema';
import testSchema from "./test-schema"
import resolvers from './agent-resolvers';
import testResolvers from "./test-resolvers"
import agentSettingsResolver from "./agent-settings-resolvers"
import agentSettingsSchema from "./agent-settings-schema"

const root = resolvers;
const schemas = testSchema;
const app = express();


app.use('/agents',graphqlHTTP({
    schema: agentSchema,
    rootValue : root,
    graphiql: true
})).use('/testdata',graphqlHTTP({
    schema: testSchema,
    rootValue : testResolvers,
    graphiql: true
})).use('/agentsettings', graphqlHTTP({
    schema : agentSettingsSchema,
    rootValue: agentSettingsResolver,
    graphiql : true
}));


app.listen(8082, () => {console.log("Running a ACD GraphQL API server at http://localhost:8082/agents")});