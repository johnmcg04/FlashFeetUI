import { JobRole } from "../service/model/jobrole";

module.exports.validateJobrole = function (jobrole: JobRole): string {
    if (jobrole.jobRole.length > 70) {
        return "Job role greater than 50 characters";
    }

    if (jobrole.jobSpecification.length > 70) {
        return "Desciption greater than 500 characters";
    }

    if (jobrole.Capability.length > 30) {
        return "Capability greater than 100 characters"
    }

    if (jobrole.bandLevel.length > 70) {
        return "Band Level greater than 100 characters"
    }

    if (jobrole.jobFamily.length > 70) {
        return "Job Family greater than 100 characters"
    }

    if (jobrole.responsibilities.length > 70) {
        return "Responsibilities greater than 100 characters"
    }

    return null
}