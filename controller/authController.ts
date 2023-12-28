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
            req.session.token = await authService.login(data); //checking is valid log in
            let isAdmin = await authService.chkAdmin(req.session.token); //checking if token is admin

            //let isAdmin = await authService.chkAdmin(data);

            // Check if log in is admin or user
            if(isAdmin == true){ //could change this to INT for further levels of security clearance e.g. managers but not admins
                // If admin -> redirect to admin-menu
                res.redirect('/admin-menu')
            } else {// If user -> redirect to menu
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
