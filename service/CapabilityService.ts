import { Capability } from "./model/Capability";


const axios = require('axios');
const capabilityValidator = require('../validator/CapabilityValidator')


module.exports.getCapability = async function (): Promise<Capability[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/capability-list') //hits endpoint from java

        return response.data
    } catch (e) {
        throw new Error('Could not get capability')
    }
} 