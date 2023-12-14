import { Application, Request, Response } from "express";
import { JobRole } from "../model/jobrole";
import axios from 'axios';




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


    app.get('/1add-new-job-role', async (req: Request, res: Response) => {
        
        if(!req.session.jobrole){
            req.session.jobrole = {}
        }

        res.render('1add-new-job-role')

    })

    app.post('/1add-new-job-role', async (req: Request, res: Response) => {
  
        req.session.jobrole["jobRole"] = req.body.jobrole

        res.redirect('/2add-new-job-role-specification')
    })

    app.get('/2add-new-job-role-specification', async (req: Request, res: Response) => {

        res.render('2add-new-job-role-specification')

    })

    app.post('/2add-new-job-role-specification', async (req: Request, res: Response) => {
  
        req.session.jobrole["specification"] = req.body.specification

        res.redirect('/3choose-capability')

    })

    app.get('/3choose-capability', async (req: Request, res: Response) => {

        res.render('3choose-capability')

    })

    app.post('/3choose-capability', async (req: Request, res: Response) => {
  
        req.session.jobrole["capability"] = req.body.capability

        res.redirect('/4choose-band-level')

    })

    app.get('/4choose-band-level', async (req: Request, res: Response) => {

        res.render('4choose-band-level')

    })

    app.post('/4choose-band-level', async (req: Request, res: Response) => {
  
        req.session.jobrole["bandLevel"] = req.body.bandLevel

        res.redirect('/5choose-job-family')

    })

    app.get('/5choose-job-family', async (req: Request, res: Response) => {

        res.render('5choose-job-family')

    })

    app.post('/5choose-job-family', async (req: Request, res: Response) => {
  
        req.session.jobrole["jobFamily"] = req.body.jobFamily

        res.redirect('/6add-new-job-responsibilities')

    })

    app.get('/6add-new-job-responsibilities', async (req: Request, res: Response) => {

        res.render('6add-new-job-responsibilities')

    })

    app.post('/6add-new-job-responsibilities', async (req: Request, res: Response) => {
  
        req.session.jobrole["responsibilities"] = req.body.responsibilities

        res.redirect('/7confirm-new-job-role')

    })


    app.post('/7confirm-new-job-role', async (req: Request, res: Response) => {
  
        let data: JobRole = req.session.jobrole
        let jobrole: JobRole

        try{

            jobrole = await jobroleService.createNewJobRole(data)
            //console.log(jobrole)

            req.session.jobrole = undefined

            res.redirect('/jobroles/' + jobrole)
        }
        catch(e){
            console.log(e)

            res.locals.errormessage = e.message

            res.render('7confirm-new-job-role', req.session.jobrole)

        }

    })

    app.post('/1add-new-job-role', async (req: Request, res: Response) => {
        let data: JobRole = req.body
        let jobrole: JobRole
        
 
        try {
            jobrole = await jobroleService.createNewJobRole(data)
 
            res.redirect('/jobroles/' + jobrole)
        } catch (e) {
            console.error(e);
            
            res.locals.errormessage = e.message
 
            res.render('1add-new-job-role', req.body)
        }
    })






}
