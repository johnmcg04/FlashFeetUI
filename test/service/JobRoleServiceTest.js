var axios = require("axios");
var axios = require("axios-mock-adapter");
// import MockAdapter from ""
var chai = require('chai');  
const expect = chai.expect;

var jobroleService = require('../../test/service/JobRoleServiceTest.js');
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

          it('should throw exception when 500 error returned from axios', async () => {
            var mock = new MockAdapter(axios);
    
            mock.onGet(jobroleService.URL).reply(500);
    
            var error;
    
            try {
              await jobroleService.getJobroles()
            } catch (e) {
              var error = e.message
            }
    
            expect(error).to.equal('Could not get job roles')
          })

    })
})


