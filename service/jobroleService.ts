import { JobRole } from "../model/jobrole";

const axios = require('axios');


module.exports.getJobroles = async function (): Promise<JobRole[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/job-role-list')

        return response.data
    } catch (e) {
        throw new Error('Could not get job roles')
    }

} 

module.exports.deleteJobRole = async function (jobRole: String) {
    try {
        const response = await axios.delete('http://localhost:8080/api/delete-job-role/' + jobRole)

        return response.data
    } catch (e) {
        throw new Error('Could not delete job role')
    }

}