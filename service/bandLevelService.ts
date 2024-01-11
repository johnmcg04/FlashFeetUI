import { BandLevel } from "../model/bandLevel";

const axios = require("axios");

module.exports.getBandLevels = async function (): Promise<BandLevel[]> {
    try {
        const response = await axios.get("http://localhost:8080/api/bandlevel-list");

        return response.data;
    } catch (e) {
        throw new Error("Could not get job band levels");
    }
}; 
