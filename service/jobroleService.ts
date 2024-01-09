import { JobRole } from "../model/jobrole";

const axios = require('axios');
const jobRoleValidator = require('../validator/jobroleValidator')

module.exports.getJobroles = async function (): Promise<JobRole[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/job-role-list')

        return response.data
    } catch (e) {
        throw new Error('Could not get job roles')
    }
} 

module.exports.getJobRole = async function (jobRole: string): Promise<JobRole> {
    try {
        const response = await axios.get("http://localhost:8080/api/jobroles/" + jobRole )

        return response.data
    } catch (e) {
        throw new Error("Could not get job role")
    }
}

module.exports.createJobRole = async function (jobrole: JobRole): Promise<string> {
    
    try {
        const response = await axios.post(
          "http://localhost:8080/api/create-job-entry/",
          jobrole
        );

        return response.data
    } catch (e) {
            throw new Error('Could not create Job Role')
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
