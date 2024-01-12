import { Request, Response } from "express";
import { JobRole } from "./model/jobrole";
import { JobRoleUpdate } from "./model/jobRoleUpdate";
import { Capability } from "./model/capability";
import { BandLevel } from "./model/bandLevel";

const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const session = require("express-session");
process.env["SESSION_SECRET"] = "your_secret_here";

const app = express();

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

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true}));

app.use(session({secret: "NOT HARDCODED SECRET", cookie: {maxAge: 60000}}));

declare module "express-session"{
    interface SessionData {
        jobRoleToUpdate : string;
        updatedJobRole : JobRoleUpdate;
        jobRole: JobRole;
        isAdmin: boolean;
        token : string;
        jobrole: JobRole;
        capability: Capability;
        bandLevel: BandLevel;
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

const authMiddleware = require("./middleware/auth");



require("./controller/authController")(app);
require("./controller/SignUpController")(app);
app.use(authMiddleware);


require("./controller/adminController")(app);
require("./controller/jobroleController")(app);
require("./controller/menuController")(app);
app.use(authMiddleware);


