const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const chai = require("chai");
const expect = chai.expect;
import { describe, it } from "mocha";


var jobroleService = require('../../../service/jobroleService.ts');
var jobRole = {
    jobRole: "Test Engineer",
    jobSpecification: "Test Specification",
    capability: 'Test Capability',
    bandLevel: 'Test Band Level',
    jobFamily: 'Test Job Family',
    responsibilities: 'Test Responsibilities',
    jobSpecSummary: 'Test Summary'
};



describe("jobroleService", function () {
  describe("getJobRoles", function () {
    it("should return job roles from response", async () => {
      var mock = new MockAdapter(axios);

      const data = [jobRole];

      var results = await jobroleService.getJobroles();

      expect(results).to.deep.equal(data);

      
    });
  });

  describe("createJobRoles", function () {
    it("should create job roles",async () => {
        var mock = new MockAdapter(axios);

        const data = [jobRole];

        var results = await jobroleService.createJobRole(data);

        expect(results).to.deep.equal(data);
    });
  });
});


