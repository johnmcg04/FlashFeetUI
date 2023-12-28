import { Login } from "../model/auth";
const axios = require("axios");

module.exports.login = async function (login: Login): Promise<void> {
    try { 
        const response = await axios.post("http://localhost:8080/api/login", login); //sending login info to API
        
        return response.data; //returning back the response of the login API endpoint
    } catch (e) {
        throw new Error("Could not login");
    }
};

module.exports.chkAdmin = async function (token: String): Promise<void> {
    try { 
        const response = await axios.post("http://localhost:8080/api/checkIsAdmin", token); //sending token to API
        return response.data; //returning back the response of the chkAdmin method in backend
    } catch (e) {
        throw new Error("Could not redirect");
    }
};