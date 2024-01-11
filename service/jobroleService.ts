import { JobRoleUpdate } from "../model/jobRoleUpdate";
import { JobRole } from "../model/jobrole";


const axios = require('axios');
const jobRoleUpdateValidator = require('../validator/jobroleUpdateValidator')

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
module.exports.updateJobRole  = async function (updatedJobRole: JobRoleUpdate, jobRoleToUpdate: String): Promise<String> {
    console.log("service")
    console.log(updatedJobRole)
    console.log(jobRoleToUpdate)
    const error: string = jobRoleUpdateValidator.validateJobrole(updatedJobRole);
    console.log(error);

    if(error){
        throw new Error(error)
    }

    try {
        console.log
        const response = await axios.put('http://localhost:8080/api/job-entry/' + jobRoleToUpdate, updatedJobRole)

        return response.data
    } catch (e) {
        throw new Error('Could not update job entry')
    }
} 

