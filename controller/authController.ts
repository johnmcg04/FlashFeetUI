/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, Application } from "express";
import { Login } from "../model/auth";
const authService = require("../service/AuthService");

module.exports = function(app: Application) {

    app.get("/login", async (req: Request, res: Response) => {
        res.render("login");
    });

    app.post("/login", async (req: Request, res: Response) => {
        const data: Login = req.body;
        try {
            req.session.token = await authService.login(data); //checking is valid log in returns UUID token
            req.session.isAdmin = await authService.chkAdmin(req.session.token);

            try{
                console.log(data.username);
                const checkIfUserHasFaceIdLinked = await authService.hasFaceIdLinkedToAccount(data.username);
                console.log("after checkIfUserHasFaceIdLinked");
                if(checkIfUserHasFaceIdLinked){
                    console.log("after if");
                    const isFaceIdValid = await authService.verifyFaceId(data.username);
                    console.log("after isFaceIdValid");

                    if(isFaceIdValid){
                        redirectToMenu(req.session.isAdmin, res);
                    }
                    else if(!isFaceIdValid){
                        throw new Error("Could not verify Face ID");
                    }
                    
                }
                if(!checkIfUserHasFaceIdLinked){
                    redirectToMenu(req.session.isAdmin, res);
                }
            }
            catch (e) {
                console.error(e);
                throw e;
            }
    
        } catch(e) {
            console.log(e);
            res.locals.errormessage = e.message;
            res.render("login", req.body);
        }
    });
     
};

function redirectToMenu(isAdmin: any, res: Response<any, Record<string, any>>) {
    try {
        if (isAdmin == true) { 
            // If admin -> redirect to admin-menu
            res.redirect("/admin-menu");
        } else { // If user -> redirect to menu
            res.redirect("/menu");
        }
    } catch (e) {
        throw new Error("Could not redirect");
    }
}


