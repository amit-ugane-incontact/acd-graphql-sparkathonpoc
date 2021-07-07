import { response } from "express";
const querystring = require('querystring');
const fetch = require("node-fetch");
const config = require("../config")
const baseURL = config.baseURL
const accesstoken = config.token


const skillsResolver = {
    getSkills: ({ input }) => {
        var inputData = querystring.stringify(input);
        console.log(baseURL + inputData);

        return fetch(`${baseURL}/services/v19.0/skills?${inputData}`,
            {
                headers:
                {
                    "authorization": "Bearer " + accesstoken
                }
            })
            .then(response => response.json());
    }
}

export default skillsResolver;