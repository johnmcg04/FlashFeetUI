const axios = require('axios');


module.exports.getJobroles = async function () {
    try {
        const response = await axios.get('http://localhost:8080/api/job-role-list')

        return response.data
    } catch (e) {
        console.log('Error: ' + e)
        throw new Error('Could not get job roles')
    }
}