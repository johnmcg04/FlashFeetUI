import { Request, Response } from "express";
import { JobRole } from "./model/jobRole";
import { Capability } from "./model/capability";
import { BandLevel } from "./model/bandLevel";


const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const session = require("express-session");

const app = express();


app.use("/public", express.static(path.join(__dirname, "public")));
 
app.use(express.json());
 
app.use(express.urlencoded({ extended: true}));


//configure nunjucks
const appViews = path.join(__dirname, "/views/");

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

//configure express

app.set("view engine", "html");

declare module "express-session" {
    interface SessionData{
        jobrole: JobRole;
        capability: Capability;
        bandLevel: BandLevel;
    }
}
    
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use(session(
        {   
            secret:"not hard coded secret", 
            cookie:{ maxAge: 60000 }
        }
    )
);

declare module "express-session" {
    interface SessionData{
        token: string;
        isAdmin: boolean;
    }
}

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});


//express routes
app.get("/", (req: Request, res: Response) => {
    res.render("login", {
        title: "Login Or Sign Up",
    });     
});

require("./controller/jobroleController")(app);

require("./controller/authController")(app);

require("./controller/SignUpController")(app);

require("./controller/adminController")(app);

require("./controller/menuController")(app);

const authMiddleware = require("./middleware/auth");
app.use(authMiddleware);
