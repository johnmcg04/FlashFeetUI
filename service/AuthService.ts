import { Login } from "../model/auth";
const axios = require("axios");

module.exports.login = async function (login: Login) {
    try { 
        const response = await axios.post("http://localhost:8080/api/login", login);
        
        // Assuming the response data contains 'token' and 'isAdmin'
        return {
            token: response.data.token,
            isAdmin: response.data.isAdmin
        };
    } catch (e) {
        throw new Error("Could not login");
    }
};
