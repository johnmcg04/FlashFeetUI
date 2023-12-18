const axios = require('axios');

import { JobRole } from "../model/jobrole";

module.exports.getJobroles = async function (): Promise<JobRole[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/job-role-list')

        return response.data
    } catch (e) {
        throw new Error('Could not get job roles')
    }
}