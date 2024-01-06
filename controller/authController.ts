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
            req.session.token = await authService.login(data); //checking is valid log in returns UUID token
            let isAdmin = await authService.chkAdmin(req.session.token); //checking if token is admin returns bool

            redirectToMenu(isAdmin, res);
        }
            catch(e){
            console.log(e)
            res.locals.errormessage = e.message
            res.render('login', req.body)
        }
    });
}
function redirectToMenu(isAdmin: any, res: Response<any, Record<string, any>>) {
    try {
        if (isAdmin == true) { 
            // If admin -> redirect to admin-menu
            res.redirect("/admin-menu");
        } else { // If user -> redirect to menu
            res.redirect("menu");
        }
    } catch (e) {
        throw new Error("Could not redirect");
    }
}

