import { JobRole } from "../model/jobrole";

module.exports.validateJobrole = function (jobrole: JobRole): string {
    if (jobrole.jobRole.length > 70) {
        return "Job role greater than 50 characters";
    }

    if (jobrole.jobSpecification.length > 70) {
        return "Desciption greater than 70 characters";
    }

    return null
}