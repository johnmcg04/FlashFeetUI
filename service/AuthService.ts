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

module.exports.chkAdmin = async function (token: string): Promise<void> {
    try { 
        const response = await axios.post("http://localhost:8080/api/checkIsAdmin", token); //sending token to API
        return response.data; //returning boolean, this could be changed to INT for further levels of security clearance e.g. managers but not admins
    } catch (e) {
        throw new Error("Could not redirect");
    }
};

module.exports.verifyFaceId = async function (username: string) {
    try {
        // Check if the user has a face id linked to their account
        const hasFaceIdLinked = await axios.get(`http://localhost:8080/api/checkIfUserHasFaceIdLinked/${username}`);
        if (hasFaceIdLinked.data) {
            // If the user has a face id linked, verify it
            const isFaceIdValid = await axios.post("http://localhost:3003/login/faceid", { username });

            if (!isFaceIdValid.data) {
                return false;
            }
        }

        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

