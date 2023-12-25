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
            let result = await authService.login(data) //logging in
            req.session.token = result.token;

            // Check if log in is admin or user
            if(result.isAdmin){
                // If admin -> redirect to admin-menu
                res.redirect('/admin-menu')
            } else {
                console.log("hitting else statement")
                // If user -> redirect to menu
                res.redirect('/menu')
            }
        }
        catch(e){
            console.log(e)
            res.locals.errormessage = e.message
            res.render('login', req.body)
        }
    });
}
