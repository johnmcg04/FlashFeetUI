import { JobRole } from "../model/jobrole";

module.exports.validateJobrole = function (jobrole: JobRole): string {
    if (jobrole.jobRole.length > 70) {
        return "Job role greater than 70 characters";
    }

    if (jobrole.jobSpecification.length > 70) {
        return "Desciption greater than 70 characters";
    }

    if (jobrole.jobCapability.length > 30) {
        return "Capability greater than 30 characters";
    }

    if (jobrole.jobBandLevel.length > 70) {
        return "Band Level greater than 70 characters"
    }

    if (jobrole.jobResponsibilities.length > 100) {
        return "Job Responsibilities greater than 100 characters"
    }

    return null
}