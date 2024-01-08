import { Request, Response, Application } from "express"
import { Login } from "../model/auth"
const authService = require("../service/SignUpService");

module.exports = function(app: Application) {

    app.get('/login', async (req: Request, res: Response) => {
        res.render('login')
    });

    app.post('/login', async (req: Request, res: Response) => {
        let data: Login = req.body

        try{
            req.session.token = await authService.login(data); //checking is valid log in returns UUID token
            //let isAdmin = await authService.chkAdmin(req.session.token); //checking if token is admin returns bool
            req.session.isAdmin = await authService.chkAdmin(req.session.token);
            redirectToMenu(req.session.isAdmin, res);
        }
            catch(e){
            console.log(e)
            res.locals.errormessage = e.message
            res.render('login', req.body)
        }
    });
}