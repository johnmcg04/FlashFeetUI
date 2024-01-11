import { JobRole } from "../model/jobrole";

const axios = require("axios");
const jobRoleUpdateValidator = require("../validator/jobroleUpdateValidator");

module.exports.getAllJobroles = async function (): Promise<JobRole[]> {
    try {
        const response = await axios.get("http://localhost:8080/api/job-role-list");

        return response.data;
    } catch (e) {
        throw new Error("Could not get job roles");
    }
}; 
module.exports.getJobRole = async function (jobRole: string): Promise<JobRole> {
    try {
        const response = await axios.get("http://localhost:8080/api/job-entry/" + jobRole);

        return response.data;
    } catch (e) {
        throw new Error("Could not get job roles");
    }
}; 
module.exports.getAllCapabilities = async function (): Promise<string[]> {
    try {
        const response = await axios.get("http://localhost:8080/api/capability-list");

        return response.data;
    } catch (e) {
        throw new Error("Could not get capabilities");
    }
}; 
module.exports.getAllBandLevels = async function (): Promise<string[]> {
    try {
        const response = await axios.get("http://localhost:8080/api/bandlevel-list");

        return response.data;
    } catch (e) {
        throw new Error("Could not get band levels");
    }
}; 
module.exports.updateJobRole  = async function (updatedJobRole: JobRole, jobRoleToUpdate: string): Promise<string> {
    const error: string = jobRoleUpdateValidator.validateJobrole(updatedJobRole);

    if(error){
        throw new Error(error);
    }

    try {
        const response = await axios.put("http://localhost:8080/api/job-entry/" + jobRoleToUpdate, updatedJobRole);

        return response.data;
    } catch (e) {
        throw new Error("Could not update job entry");
    }
};

module.exports.deleteJobRole = async function (jobRole: string) {
    try {
        const response = await axios.delete("http://localhost:8080/api/delete-job-role/" + jobRole);

        return response.data;
    } catch (e) {
        throw new Error("Could not delete job role");
    }

};
