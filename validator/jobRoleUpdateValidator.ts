import { JobRoleUpdate } from "../model/jobRoleUpdate";

module.exports.validateJobrole = function (jobrole: JobRoleUpdate): string {
    if (jobrole.jobRole.length > 50) {
        return "Job role greater than 50 characters";
    }

    if (jobrole.jobSpecification.length > 500) {
        return "Specification link greater than 500 characters";
    }

    return null
}