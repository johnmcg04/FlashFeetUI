import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobrole";
import { Capability } from "../model/capability";
import { BandLevel } from "../model/bandLevel";

const jobroleService = require("../service/jobroleService");

const capabilityService = require("../service/capabilityService");
const bandLevelService = require("../service/bandLevelService");

module.exports = function(app: Application){

    app.get("/jobroles", async (req: Request, res: Response) => {
        let data: JobRole[] = [];

        try {
            data = await jobroleService.getAllJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render("list-job-roles", {jobroles:data});
    });

    app.get("/admin-delete-job-role", async (req: Request, res: Response) => {
        let data: string = "";

        try {
            data = await jobroleService.getAllJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render("delete-job-role", {jobroles:data});
    });

    app.post("/admin-delete-job-role", async (req: Request, res: Response) => {
        const data: string = req.body.jobRole;

         try {
            await jobroleService.deleteJobRole(data);

            res.redirect("/admin-menu");
        } catch (e) {
            console.error(e);
            res.locals.errormessage = e.message;
            res.redirect("admin-menu");
        }

    });

    app.get("/admin-edit-job-role-selection", async (req: Request, res: Response) => {
        let data: JobRole[] = [];

        try {
            data = await jobroleService.getAllJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render("edit-job-role-selection", {jobRoles:data});
    });

    app.post("/admin-edit-job-role-selection", async (req: Request, res: Response) => {
        req.session.jobRoleToUpdate = req.body.jobRole;
        res.redirect("/admin-edit-job-role");
    });

    app.get("/admin-edit-job-role", async (req: Request, res: Response) => {
        let data: JobRole;
        let BandLevels: string[] = [];
        let Capabilities: string[] = [];

        try {
            data = await jobroleService.getJobRole(req.session.jobRoleToUpdate);
            BandLevels = await jobroleService.getAllBandLevels(); 
            Capabilities = await jobroleService.getAllCapabilities();
        } catch (e) {
            console.error(e);
        }

        res.render("edit-job-role", {JobRole: data, Capabilities:Capabilities, BandLevels:BandLevels});
    });

    app.post("/admin-edit-job-role", async (req: Request, res: Response) => {
        req.session.updatedJobRole = req.body;
        res.redirect("/admin-edit-job-role-confirmation");
    });

    app.get("/admin-edit-job-role-confirmation", async (req: Request, res: Response) => {

        res.render("edit-job-role-confirmation", {JobRole:req.session.updatedJobRole});
    });

    app.post("/admin-edit-job-role-confirmation", async (req: Request, res: Response) => {
        const jobRoleToUpdate = req.session.jobRoleToUpdate;
        try {
             await jobroleService.updateJobRole(req.session.updatedJobRole, jobRoleToUpdate);

            req.session.updatedJobRole = undefined;
            req.session.jobRoleToUpdate = undefined;

            res.redirect("/admin-menu");
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

        }

    });

    //add new job role

    app.get("/admin-add-new-job-role", async (req: Request, res: Response) => {

        if (!req.session.jobrole) {
            req.session.jobrole = {};
        }

        res.render("1add-new-job-role");

    });

    app.post("/admin-add-new-job-role", async (req: Request, res: Response) => {

        req.session.jobrole["jobRole"] = req.body.jobRole;

        res.redirect("/admin-add-new-job-spec-summary");
    });

    app.get("/admin-add-new-job-spec-summary", async (req: Request, res: Response) => {

        res.render("add-new-job-spec-summary");

    });

    app.post("/admin-add-new-job-spec-summary", async (req: Request, res: Response) => {

        req.session.jobrole["jobSpecSummary"] = req.body.jobSpecSummary;

        res.redirect("/admin-add-new-job-role-specification");

    });

    app.get("/admin-add-new-job-role-specification", async (req: Request, res: Response) => {

        res.render("2add-new-job-role-specification");

    });

    app.post("/admin-add-new-job-role-specification", async (req: Request, res: Response) => {

        req.session.jobrole["jobSpecification"] = req.body.jobSpecification;

        res.redirect("/admin-choose-capability");

    });

    app.get("/admin-choose-capability", async (req: Request, res: Response) => {
        let data: Capability;

        try {

            data = await capabilityService.getCapabilities();
        } catch (e) {
            console.error(e);
        }
        if (!req.session.capability) {
            req.session.capability = {};
        }

        res.render("3choose-capability", {
            capabilities:data
        });
    });

    app.post("/admin-choose-capability", async (req: Request, res: Response) => {

        req.session.capability["capability"] = req.body.capability;

        res.redirect("/admin-choose-band-level");

    });

    app.get("/admin-choose-band-level", async (req: Request, res: Response) => {
        let data: BandLevel;

        try {
            data = await bandLevelService.getBandLevels();
        } catch (e) {
            console.error(e);
        }
        if (!req.session.bandLevel) {
            req.session.bandLevel = {};
        }

        res.render("4choose-band-level", {
            bandLevels:data
        });
    });

    app.post("/admin-choose-band-level", async (req: Request, res: Response) => {

        req.session.bandLevel["bandLevel"] = req.body.bandLevel;

        res.redirect("/admin-choose-job-family");

    });

    app.get("/admin-choose-job-family", async (req: Request, res: Response) => {
        let uniqueJobFamilies: string[];
        let data: JobRole[] = [];

            try {
                data = await jobroleService.getAllJobroles();

                uniqueJobFamilies = Array.from(new Set(data.map(JobRole => JobRole.jobFamily))); 

            } catch (e) {
                console.error(e);
            }

            res.render("5choose-job-family", {
                jobFamilies: uniqueJobFamilies
            }); 

        });

    app.post("/admin-choose-job-family", async (req: Request, res: Response) => {

        req.session.jobrole["jobFamily"] = req.body.jobFamily;

        res.redirect("/admin-add-new-job-responsibilities");

    });

    app.get("/admin-add-new-job-responsibilities", async (req: Request, res: Response) => {

        res.render("6add-new-job-responsibilities");

    });

    app.post("/admin-add-new-job-responsibilities", async (req: Request, res: Response) => {

        req.session.jobrole["responsibilities"] = req.body.responsibilities;

        res.redirect("/admin-confirm-new-job-role");

    });

    app.get("/admin-confirm-new-job-role", async (req: Request, res: Response) => {
      let data: JobRole[];


      try {
        data = await jobroleService.getJobRole(
          req.session.jobrole.jobRole
        );
      } catch (e) {
        console.error(e);
      }

      res.render("7confirm-new-job-role", {
        jobRole: req.session.jobrole,
        bandLevel: req.session.bandLevel,
        capability: req.session.capability
      });
    });


    app.post("/admin-confirm-new-job-role", async (req: Request, res: Response) => {

        const data: JobRole = req.session.jobrole;
        data.bandLevel = req.session.bandLevel.bandLevel;
        data.capability = req.session.capability.capability;

        jobroleService.createJobRole(data);


        try{

            req.session.jobrole = undefined;
            req.session.bandLevel = undefined; 
            req.session.capability = undefined;

            res.redirect("/admin-menu");
        }
        catch(e){
            console.log(e);

            res.locals.errormessage = e.message;

            res.render("7confirm-new-job-role", {
              jobRole: req.session.jobrole,
              bandLevel: req.session.bandLevel,
              capability: req.session.capability,
            });
        }
    });


};

