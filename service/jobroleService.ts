import { JobRole } from "./model/jobrole";

const axios = require('axios');
const productValidator = require('../validator/jobroleValidator')

module.exports.getJobroles = async function (): Promise<JobRole[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/jobroles')

        return response.data
    } catch (e) {
        throw new Error('Could not get job roles')
    }
} 