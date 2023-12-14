import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobrole";

const jobroleService = require('../service/jobroleService')

module.exports = function(app: Application){

    app.get('/jobroles', async (req: Request, res: Response) => {
        let data: JobRole[]

        try {
            data = await jobroleService.getJobroles()
        } catch (e) {
            console.error(e);
        }

        res.render('list-job-roles', {jobroles:data})
    })

    app.get('/delete-job-role', async (req: Request, res: Response) => {
        let data: String;

        try {
            data = await jobroleService.getJobroles();
        } catch (e) {
            console.error(e);
        }
      
        res.render('list-job-roles', {jobroles:data})


        res.render('delete-job-role', {
            jobroles: data,
        })
    });

    app.post('/delete-job-role', async (req: Request, res: Response) => {
        let data: String = req.body.jobRole
        let jobRole: String

         try {
            jobRole = await jobroleService.deleteJobRole(data)

            res.redirect('/delete-job-role/' + jobRole)
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

            res.render('delete-job-role')
        }

    })
}
