import { JobRole } from "../model/jobRole";

module.exports.validateJobrole = function (jobrole: JobRole): string {
    if (jobrole.jobRole.length > 70) {
        return "Job role greater than 50 characters";
    }

    return null
}