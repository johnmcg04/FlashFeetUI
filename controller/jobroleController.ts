import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobRole";

const jobroleService = require("../service/jobroleService");

module.exports = function(app: Application){

    app.get("/jobroles", async (req: Request, res: Response) => {
        let data: JobRole[];

        try {
            data = await jobroleService.getJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render("list-job-roles", {jobroles:data});
    });

    app.get("/delete-job-role", async (req: Request, res: Response) => {
        let data: string;

        try {
            data = await jobroleService.getJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render("list-job-roles", {jobroles:data});


        res.render("delete-job-role", {
            jobroles: data,
        });
    });

    app.post("/delete-job-role", async (req: Request, res: Response) => {
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
};
