import { Request, Response } from "express";
import { JobRole } from "./model/jobrole";
import { Capability } from "./model/capability";
import { BandLevel } from "./model/bandLevel";


const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");
const session = require("express-session")

const app = express();


app.use('/public', express.static(path.join(__dirname, 'public')));
 
app.use(express.json())
 
app.use(express.urlencoded({ extended: true}))

app.use(session({secret: 'NOT HARDCODED SECRET', cookie: {maxAge: 60000}}));

// Configure Nunjucks
const appViews = path.join(__dirname, "/views/");

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appViews, nunjucksConfig);

// Configure Express
app.set("view engine", "html");

declare module "express-session" {
    interface SessionData{
        jobrole: JobRole;
        capability: Capability;
        bandLevel: BandLevel;
    }
    
}

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// Express Routes
app.get("/", (req: Request, res: Response) => {
    res.render("index");
});

require('./controller/jobroleController')(app)
