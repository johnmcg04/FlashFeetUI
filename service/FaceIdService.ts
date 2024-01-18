const axios = require("axios");

const faceIdService = {
    signUpFaceId: async (username : string) => {
        try {
            const response = await axios.post("http://localhost:3001/signup/faceid/" + username);
            //Python endpoint returns a true or false value
            return response.data;
        } 
        catch (error) {
            console.error(error);
            return false;
        }
    }
};

module.exports = faceIdService;

