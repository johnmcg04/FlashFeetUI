import { Request, Response, Application } from "express";
import { SignUp } from "../model/SignUp";
const signUpService = require("../service/SignUpService");
const faceIdService = require("../service/FaceIdService");

module.exports = function(app: Application) {

    app.get("/signup", async (req: Request, res: Response) => {
        res.render("signup");
    });

    app.post("/signup", async (req: Request, res: Response) => {
        const data: SignUp = req.body;
        try {
            // Check if the user has opted for Face ID
            if (req.body.faceId) {
                req.session.token = await signUpService.signUpFaceId(data);
                const faceIdResult = await faceIdService.signUpFaceId(data.username); // Assuming signUpFaceId hits the Python endpoint and returns true or false
                if (faceIdResult) {
                    setTimeout(() => {
                        res.redirect("/login");
                    }, 5000); // Wait for 5 seconds before redirecting
                } else {
                    res.locals.errormessage = "Face ID registration failed. Please try again.";
                    res.render("signup", req.body);
                }
            } else {
                req.session.token = await signUpService.signUp(data); 
                res.redirect("/login");
            }
        } catch(e) {
            console.log(e);
            res.locals.errormessage = e.message;
            res.render("signup", req.body);
        }        
    });
};

