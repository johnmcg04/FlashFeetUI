import { Application, Request, Response } from "express";
import { Capability } from "../service/model/Capability";

const capabilityService = require('../service/CapabilityService')



module.exports = function(app: Application){

    app.get('/jobroles', async (req: Request, res: Response) => {
        let data: Capability[]

        try {
            data = await capabilityService.getCapability()
            console.log(data)
        } catch (e) {
            console.error(e);
        }

        res.render('list-job-roles')
    })
}