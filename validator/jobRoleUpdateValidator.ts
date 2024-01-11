import { JobRole } from "../model/jobRole";

module.exports.validateJobrole = function (jobRole: JobRole): string {
    if (jobRole.jobRole.length > 50) {
        return "Job role greater than 50 characters";
    }

    if (jobRole.jobSpecification.length > 500) {
        return "Specification link greater than 500 characters";
    }

    return "";
};
