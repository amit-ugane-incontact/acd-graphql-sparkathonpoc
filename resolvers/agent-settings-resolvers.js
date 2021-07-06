import { response } from "express";
const fetch = require("node-fetch");
const config = require("../config")
const baseURL = config.baseURL
const accesstoken = config.token


const agentSettingsResolver = {
    getAgentSettings : ({agentId}) => {
        return fetch(`${baseURL}/services/v20.0/agents/${agentId}/agent-settings`,
       {            
           headers : 
           {
               "authorization": "Bearer "+ accesstoken
           }            
       })
       .then(response => response.json());
    }
}

export default agentSettingsResolver;