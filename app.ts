import { Response, Request } from 'express';

const express = require('express');
const path = require("path");
const nunjucks = require("nunjucks");
const { title } = require('process');
const session = require('express-session');
process.env['SESSION_SECRET'] = 'your_secret_here'


const app = express();

//configure nunjucks
let appViews = path.join(__dirname, '/views/');

let nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};


nunjucks.configure(appViews, nunjucksConfig);

//configure express

app.set('view engine', 'html');

app.use("/public", express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// console.log(sessionSecret);
// if(!sessionSecret) {
//     throw new Error("SESSION_SECRET environment variable is not set");
// }

app.use(session(
        {   
            secret:'not hard coded secret', 
            cookie:{ maxAge: 60000 }
        }
    )
);

declare module "express-session" {
    interface SessionData{
        token: string;
        
    }
    
}

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

//express routes

app.get('/index', (req: Request, res: Response) => {
    res.render("index", {
        title: 'index',
    });     
});

// require('./controller/jobroleController')(app);

// const authMiddleware = require("./middleware/auth");
// app.use(authMiddleware);

require('./controller/authController')(app);
require('./controller/tokenController')(app);