const axios = require("axios");

const faceIdService = {
    signUpFaceId: async (username : string) => {
        try {
            console.log("getting into service method");
            
            const response = await axios.post("/signup/faceid", {
                username
            });
            // Assuming the Python endpoint returns a JSON response with a 'success' field
            return response.data.success;
            } 
        catch (error) {
            console.error(error);
            return false;
        }
    }
};

module.exports = faceIdService;
