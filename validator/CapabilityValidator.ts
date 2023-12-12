import { Capability } from "../service/model/Capability";


module.exports.validateJobCapability = function (capability: Capability): string {
    if (capability.capability.length > 70) {
        return "Job capability cannot be greater than 70 characters";
    }
    
    return null
}