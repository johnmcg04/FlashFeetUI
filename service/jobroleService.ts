import { JobRole } from "../model/jobrole";


const axios = require('axios');
const jobRoleValidator = require('../validator/jobroleValidator')

module.exports.getAllJobroles = async function (): Promise<JobRole[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/job-role-list')

        return response.data
    } catch (e) {
        throw new Error('Could not get job roles')
    }
} 
module.exports.getJobRole = async function (jobRole: String): Promise<JobRole> {
    try {
        const response = await axios.get('http://localhost:8080/api/job-entry/' + jobRole)

        return response.data
    } catch (e) {
        throw new Error('Could not get job roles')
    }
} 
module.exports.getAllCapabilities = async function (): Promise<String[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/capability-list')

        return response.data
    } catch (e) {
        throw new Error('Could not get capabilities')
    }
} 
module.exports.getAllBandLevels = async function (): Promise<String[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/bandlevel-list')

        return response.data
    } catch (e) {
        throw new Error('Could not get band levels')
    }
} 


