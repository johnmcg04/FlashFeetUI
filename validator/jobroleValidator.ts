import { JobRole } from "../service/model/jobrole";

module.exports.validateJobrole = function (jobrole: JobRole): string {
    if (jobrole.jobRole.length > 70) {
        return "Job role cannot be greater than 70 characters";
    }
    
    return null
}

