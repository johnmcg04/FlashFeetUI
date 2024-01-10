import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobrole";

const jobroleService = require('../service/jobroleService')

module.exports = function(app: Application){

    app.get('/jobroles', async (req: Request, res: Response) => {
        let data: JobRole[]

        try {
            data = await jobroleService.getAllJobroles()
            console.log(data)
        } catch (e) {
            console.error(e);
        }

        res.render('list-job-roles', {jobroles:data})
    })

    app.get('/edit-job-role-selection', async (req: Request, res: Response) => {
        let data: JobRole[]

        try {
            data = await jobroleService.getAllJobroles()
           // console.log(data)
        } catch (e) {
            console.error(e);
        }

        res.render('edit-job-role-selection', {jobRoles:data})
    })

    app.post('/edit-job-role-selection', async (req: Request, res: Response) => {
        req.session.jobRoleToUpdate= req.body.jobRole
        res.redirect('/edit-job-role')
    })

    app.get('/edit-job-role', async (req: Request, res: Response) => {
        let data: JobRole
        let BandLevels: String[]
        let Capabilities: String[]

        try {
            console.log(req.session.jobRoleToUpdate)
            data = await jobroleService.getJobRole(req.session.jobRoleToUpdate)
            BandLevels = await jobroleService.getAllBandLevels()
            Capabilities = await jobroleService.getAllCapabilities()
           // console.log(data)
        } catch (e) {
            console.error(e);
        }
        console.log(data)

        res.render('edit-job-role', {JobRole:data, Capabilities:Capabilities, BandLevels:BandLevels})
    })

    app.post('/edit-job-role', async (req: Request, res: Response) => {
        console.log(req.body)
        res.redirect('/edit-job-role')
    })
}


