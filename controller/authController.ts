import { Request, Response, Application } from "express"
import { Login } from "../model/auth"

const authService = require("../service/AuthService");


module.exports = function(app: Application) {

    app.get('/login', async (req: Request, res: Response) => {

        res.render('login')
    });

    app.post('/login', async (req: Request, res: Response) => {
        let data: Login = req.body


        try{
            req.session.token = await authService.login(data) //logging in

            //need to check if log in is admin or user

            //if admin  ->    admin-menu

            //if user   ->    menu

            res.redirect('/menu')
        }
        catch(e){
            console.log(e)
            
            res.locals.errormessage = e.message

            res.render('login', req.body)
        }
    });
}