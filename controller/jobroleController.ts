import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobRole";

const jobroleService = require("../service/jobroleService");

module.exports = function(app: Application){

    app.get("/jobroles", async (req: Request, res: Response) => {
        let data: JobRole[] = [];

        try {
            data = await jobroleService.getJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render("list-job-roles", {jobroles:data});
    });

    app.get("/admin-delete-job-role", async (req: Request, res: Response) => {
        let data: string = "";

        try {
            data = await jobroleService.getJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render("delete-job-role", {jobroles:data});
    });

    app.post("/admin/delete-job-role", async (req: Request, res: Response) => {
        const data: string = req.body.jobRole;
        let jobRole: string;

         try {
            jobRole = await jobroleService.deleteJobRole(data);

            res.redirect("/delete-job-role/" + jobRole);
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

            res.render("delete-job-role");
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
        req.session.jobRole= req.body.jobRole;
        res.redirect("/edit-job-role");
    });

    app.get("/edit-job-role", async (req: Request, res: Response) => {
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
        res.redirect("/edit-job-role-confirmation");
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

            res.redirect("/jobroles");
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message;

        }

    });
};

