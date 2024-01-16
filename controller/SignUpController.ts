import { Request, Response, Application } from "express";
import { SignUp } from "../model/SignUp";
const signUpService = require("../service/SignUpService");

module.exports = function(app: Application) {

    app.get("/signup", async (req: Request, res: Response) => {
        res.render("signup");
    });

    app.post("/signup", async (req: Request, res: Response) => {
        const data: SignUp = req.body;

        try{
            req.session.token = await signUpService.signUp(data); //checking is valid sign up

            // if they clicked the check box for face id redirect to signup/faceid
            // call method for hitting endpoint on python, this will return true or false
            // if true redirect to login else redirect back to signup and ask to try again

            res.redirect("/login");
        }
            catch(e){
            console.log(e);
            res.locals.errormessage = e.message;
            res.render("signup", req.body);
        }
    });
};
