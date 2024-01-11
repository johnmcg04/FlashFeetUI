import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobrole";
import { JobRoleUpdate } from "../model/jobRoleUpdate";

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
        let data: JobRoleUpdate
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
        req.session.updatedJobRole = req.body
        console.log(req.body)
        console.log(req.session.updatedJobRole)
        res.redirect('/edit-job-role-confirmation')
    })

    app.get('/edit-job-role-confirmation', async (req: Request, res: Response) => {

        res.render('edit-job-role-confirmation', {JobRole:req.session.updatedJobRole})
    })

    app.post('/edit-job-role-confirmation', async (req: Request, res: Response) => {
        const jobRoleToUpdate : String = req.session.jobRoleToUpdate
        console.log(jobRoleToUpdate)
        try {
             await jobroleService.updateJobRole(req.session.updatedJobRole, jobRoleToUpdate)

            req.session.updatedJobRole = undefined
            req.session.jobRoleToUpdate = undefined

            res.redirect('/jobroles')
        } catch (e) {
            console.error(e);

            res.locals.errormessage = e.message

        }

    })
}


