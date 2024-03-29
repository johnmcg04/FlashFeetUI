import { Request, Response } from "express";
import { JobRole } from "./model/jobrole";

const express = require("express");
const path = require("path");
const nunjucks = require("nunjucks");

const app = express();


app.use('/public', express.static(path.join(__dirname, 'public')));
 
app.use(express.json())
 
app.use(express.urlencoded({ extended: true}))

declare module "express-session" {
    interface SessionData {
        jobRole: JobRole
    }
}

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

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

// Express Routes
app.get("/", (req: Request, res: Response) => {
    res.render("index");
});


require('./controller/jobroleController')(app)

