# acd-graphql-sparkathonpoc
This is a POC to showcase how graphql express can act as a mediator between ACD Apis and Consumers to elevate consumer experience.

# Prerequists 
1. Node JS 14.x
2. Visual Studio Code

# How to get started
1. Clone this repository 
2. Run npm install
3. Run npm start
4. Open browser and browse http://localhost:8082/agents in chrome or firefox.
5. Write queries as shown in graphiql docs.
6. Since authentication with ACD is not yet integrated in the POC , you would need to change below two keys from config.js 
    module.exports.baseURL = "https://api-do59.dev.nice-incontact.com/InContactAPI/"; 
    module.exports.token = 'Valid Token. Get it from JS Test' ;


# References
This POC Uses Graphql and GraphQL Express. Below are some of the reference and training links on GraphQL
1. https://graphql.org/ - Official GraphQL Documentation.
2. https://youtu.be/_Zss2Mbz4Bs - GraphQL Crash course
3. https://youtu.be/bRnu7xvU1_Y - Building Modern APIs with GraphQL 
4. https://youtu.be/RDQyAcvmbpM - Fetching data from an API in GraphQL 

There are few more alternatives we would be evaluating such as AWS AppSync, Appolo GrpahQL Client etc.
