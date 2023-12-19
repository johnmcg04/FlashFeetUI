import { Application, Request, Response } from "express";
import { JobRole } from "../service/model/jobrole";

const jobroleService = require('../service/jobroleService')

module.exports = function(app: Application){

    app.get('/jobroles', async (req: Request, res: Response) => {
        let data: JobRole[]

        try {
            data = await jobroleService.getJobroles()
            console.log(data)
        } catch (e) {
            console.error(e);
        }

        res.render('list-job-roles', {jobroles:data})
    })
}


