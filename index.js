import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import agentSchema from './schemas/agent-schema';
import agentSettingsSchema from "./schemas/agent-settings-schema";
import testSchema from "./schemas/test-schema";
import skillsSchema from "./schemas/skills-schema";
import resolvers from './resolvers/agent-resolvers';
import testResolvers from "./resolvers/test-resolvers";
import agentSettingsResolver from "./resolvers/agent-settings-resolvers";
import skillsResolver from "./resolvers/skills-resolvers";

const root = resolvers;
const schemas = testSchema;
const app = express();

app.use('/agents', graphqlHTTP({
    schema: agentSchema,
    rootValue: root,
    graphiql: true
})).use('/testdata', graphqlHTTP({
    schema: testSchema,
    rootValue: testResolvers,
    graphiql: true
})).use('/agentsettings', graphqlHTTP({
    schema: agentSettingsSchema,
    rootValue: agentSettingsResolver,
    graphiql: true
})).use('/skills', graphqlHTTP({
    schema: skillsSchema,
    rootValue: skillsResolver,
    graphiql: true
}));


app.listen(8082, () => { console.log("Running a ACD GraphQL API server at http://localhost:8082/agents") });