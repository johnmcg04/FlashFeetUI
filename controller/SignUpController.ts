import { Request, Response, Application } from "express"
import { SignUp } from "../model/auth"
const signUpService = require("../service/SignUpService");

module.exports = function(app: Application) {

    app.get('/signup', async (req: Request, res: Response) => {
        res.render('signup')
    });

    app.post('/signup', async (req: Request, res: Response) => {
        let data: SignUp = req.body

        try{
            req.session.token = await signUpService.signUp(data); //checking is valid sign up
        }
            catch(e){
            console.log(e)
            res.locals.errormessage = e.message
            res.render('signup', req.body)
        }
    });
}