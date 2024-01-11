import { JobRole } from "../model/jobrole";

module.exports.validateJobrole = function (jobRole: JobRole): string {
    
    if (jobRole.jobRole.length > 70) {
        return "Job role greater than 50 characters";
    }

    if (jobRole.jobSpecification.length > 70) {
        return "Desciption greater than 70 characters";
    }

    if (jobRole.capability.length > 30) {
        return "Capability greater than 30 characters";
    }

    if (jobRole.bandLevel.length > 70) {
        return "Band Level greater than 100 characters";
    }

    return "";
};
