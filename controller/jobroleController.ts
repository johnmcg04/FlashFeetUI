import { Application, Request, Response } from "express";
import { JobRole } from "../service/model/jobrole";

const jobroleService = require('../service/jobroleService')

module.exports = function(app: Application){

    app.get ('/jobroles', async (req: Request, res: Response) => {
        let data: JobRole[]

            data = await jobroleService.getJobroles()
            console.log(data)
        

        res.render('list-job-roles', { jobroles: data })
    })}
