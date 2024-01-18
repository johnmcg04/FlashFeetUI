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
                const response = await authService.hasFaceIdLinkedToAccount(data.username);
                console.log("after checkIfUserHasFaceIdLinked");
                if(response == true){
                    console.log("after if");
                    const isFaceIdValid = await authService.verifyFaceId(data.username);
                    console.log("after isFaceIdValid");
                    // await new Promise(resolve => setTimeout(resolve, 6000));
            
                    if(isFaceIdValid){
                        redirectToMenu(req.session.isAdmin, res);
                    }
                    else if(!isFaceIdValid){
                        throw new Error("Could not verify Face ID");
                    }
                    
                }
                if(response == false){
                    console.log("doesnt return 200");
                    redirectToMenu(req.session.isAdmin, res);
                }
            }
            catch (error) {
                console.error(error);
                throw(error);
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


