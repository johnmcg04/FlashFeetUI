import { Capability } from "../model/capability";

const axios = require('axios');

module.exports.getCapabilities = async function (): Promise<Capability[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/capability-list')

        return response.data
    } catch (e) {
        throw new Error('Could not get job capabilities')
    }
} 