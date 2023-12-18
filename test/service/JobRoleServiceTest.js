var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var chai = require('chai');  
const expect = chai.expect;

var jobroleService = require('../../service/jobroleService.ts');
var jobRole = {
    jobRole: "Test Engineer"
}

describe('jobroleService', function () {
    describe('getJobRoles', function () {

        it('should return job roles from response', async () => {
            var mock = new MockAdapter(axios);
    
            const data = [jobRole];
    
            mock.onGet(jobroleService.URL).reply(200, data);
    
            var results = await jobroleService.getJobroles();
    
            expect(results[0]).to.deep.equal(jobRole)
          })

    })
})



