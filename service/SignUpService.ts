import { SignUp } from "../model/auth";
import { Request, Response, Application } from "express"
const axios = require("axios");

module.exports.signUp = async function (signUp: SignUp): Promise<void> {
    try { 
        const response = await axios.post("http://localhost:8080/api/signup", signUp); //sending sign up info to API
        
        return response.data; //returning back the response of the sign up API endpoint
        
    } catch (e) {
        throw new Error("Could not sign up");
    }
};