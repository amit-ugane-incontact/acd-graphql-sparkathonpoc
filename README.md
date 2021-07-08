# Sparkathon POC - Enhancing ACD Api Consumer Experience with GraphQL
This is a POC to showcase how graphql yoga can act as a mediator between ACD Apis and Consumers to elevate consumer experience.

## Prerequists 
* Node JS 14.x
* Visual Studio Code

## How to get started
1. Clone this repository 
2. Run npm install
3. Run npm start
4. Open browser and browse http://localhost:4000 in chrome or firefox.
5. Write queries as shown in graphiql docs which gets the list of agents and associated agent settings. Below query will get the data from 2 API's
    1. GET /agents API which returns the list of agents
    2. GET /agents/{agentId}/agent-settings API which returns the specific settings for an agent
    ``` 
        i.e. 
        query {
            getAgents(input: { skip: 0, top: 2 }) {
                agentId
                userId
                userName
                firstName
                emailAddress
                settings {
                    wfoApiUrl
                    wfoWebsiteUrl
                    wfoWebServiceUrl
                }
            }
        }

    ```
6. If we don't want agent settings then graphql query would be like below and it won't hit the agent settings API as mentioned above
    ``` 
        i.e. 
        query {
            getAgents(input: { skip: 0, top: 2 }) {
                agentId
                userId
                userName
                firstName
                emailAddress                
            }
        }

    ```
7. Since authentication with ACD is not yet integrated in the POC , you would need to change below two keys from index.js 
    - baseURL = "https://api-na1.staging.niceincontact.com/incontactapi/"; 
    - token = 'Valid Token. Get it from JS Test' ;


## References
This POC Uses Graphql and GraphQL yoga. Below are some of the reference and training links on GraphQL
* https://graphql.org/ - Official GraphQL Documentation.
* https://youtu.be/_Zss2Mbz4Bs - GraphQL Crash course
* https://youtu.be/bRnu7xvU1_Y - Building Modern APIs with GraphQL 
* https://youtu.be/RDQyAcvmbpM - Fetching data from an API in GraphQL 

There are few more alternatives we would be evaluating such as AWS AppSync, Appolo GrpahQL Client etc.
