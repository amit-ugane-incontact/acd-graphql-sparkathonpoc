import { response } from "express";
import { agentSchema } from "../schemas/agent-schema"

const querystring = require('querystring');
const fetch = require("node-fetch");

const config = require("../config")
const baseURL = config.baseURL
const accesstoken = config.token

const resolvers = {   
    
     getAgents : ({ input }) => {
         var inputData = querystring.stringify(input);
         console.log(baseURL + inputData);        

         return fetch(`${baseURL}/services/v21.0/agents?${inputData}`,
        {            
            headers : 
            {
                "authorization": "Bearer "+ accesstoken
            }            
        })
        .then(response => response.json());        
        /* Countries API Working
        return fetch(`${baseURL}/services/v7.0/countries`,
        {
            method: "GET",
            withCredentials: true,
            credentials: "include",
            headers : 
            {
                "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpY0JVSWQiOjEwMCwibmFtZSI6Im1hbmdlc2guZ2hvcm1vZGVAZG81OS5jb20iLCJpc3MiOiJodHRwczovL2FwaS1kbzU5LmRldi5uaWNlLWluY29udGFjdC5jb20iLCJzdWIiOiJ1c2VyOjIxMTQiLCJhdWQiOiJpbnRlcm5hbEBpbkNvbnRhY3QgSW5jLiIsImV4cCI6MTYyMzgxNzU3NCwiaWF0IjoxNjIzODEzOTc1LCJpY1Njb3BlIjoiMSwyLDQsNSw3LDgiLCJpY0NsdXN0ZXJJZCI6IkRPNTkiLCJpY0FnZW50SWQiOjIxMTQsImljU1BJZCI6MTgsImdpdmVuX25hbWUiOiJNYW5nZXNoIiwiZmFtaWx5X25hbWUiOiJHaG9ybW9kZSIsInRlbmFudElkIjoiMTFlYjdjYzMtNWM5Mi1hNTUyLTg0YTQtMDY4NzA3MjQ1YmI2IiwibmJmIjoxNjIzODEzOTc0fQ.PU7QUt6QiIO0_Gc2ji6-nF9WHdFWcnY63tTQu_bUXtn-nh5DSNfhUvoHKct6oa252HQLqxRLb-zH23VF8hMxPdlkHS1Imj_3_j2-BA4mJQWS7jkQB3tV0ejMNKferH3MtX0Bd7xOmb-NMGBJzPEKQXZQ_-qUb3SmwdCau6idowJNkuPbxR-QF7u4Ax3FAtG3jNgogtP9QQKF9roD59CllPGTrHojEhQCXdXizciVD3I8jm70LkBNptVBB8F86XCz3vrR_6yz2y_Tn4i2Rk2ifHEQGUrLC556gHpQ3SZ43Pug4EU84XDGNgn0-cwrhwtsY5rIxbPwDwe4DgAYFWbf9A",
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        */

        // return [
        //             {agentId : "1", userName : "amitu",firstName: "Amit",userId: "111",emailAddress:"amit.ugane@nice.com"},
        //             {agentId : "2", userName : "mangeshghormode",firstName: "Mangesh",userId: "222",emailAddress:"mangesh.ghormode@nice.com"}            
        //         ]

        // return fetch(`https://jsonplaceholder.typicode.com/todos/1`)
        // .then(response => response.json())
        // .then(json => console.log(json))
    },

    // getAgents : ({}) => {        
    //     //return fetch(`${baseURL}/services/v21.0/agents`).then(res => response.json())
    //     return [
    //         {agentId : "1", userName : "amitu",firstName: "Amit",userId: "111",emailAddress:"amit.ugane@nice.com"},
    //         {agentId : "2", userName : "mangeshghormode",firstName: "Mangesh",userId: "222",emailAddress:"mangesh.ghormode@nice.com"}            
    //     ]
    // }

    getAgentSettings : ({agentId}) => {            
        console.log(`Agent ID : ${agentId}`);           
    
        return fetch(`${baseURL}/services/v20.0/agents/${agentId}/agent-settings`,
       {            
           headers : 
           {
               "authorization": "Bearer "+ token
           }            
       })
       .then(response => response.json());
    },

    Agent : {
        settings : () =>
        {
            console.log("agent settings")
            return null;
        }
    }    
}

export default resolvers;