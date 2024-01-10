import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobrole";

const jobroleService = require('../service/jobroleService')

module.exports = function(app: Application){

    app.get('/jobroles', async (req: Request, res: Response) => {
        let data: JobRole[]

            data = await jobroleService.getJobroles()
        
        res.render('list-job-roles', { jobroles: data })
    })


    app.get('/delete-job-role', async (req: Request, res: Response) => {
        let data: String;

        try {
            data = await jobroleService.getJobroles();
        } catch (e) {
            console.error(e);
        }

        res.render('list-job-roles')
    })
}