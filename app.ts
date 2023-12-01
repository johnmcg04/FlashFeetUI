import { Response, Request } from 'express';
import { Product } from './model/product';
import { ProductSession } from './model/ProductSession';

const express = require('express');
const path = require("path");
const nunjucks = require("nunjucks");
const { title } = require('process');
const session = require('express-session');



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

app.use(session(
        {   
            secret:'not hard coded secret', 
            cookie:{ maxAge: 60000 }
        }
    )
);

declare module "express-session" {
    interface SessionData{
        product: Product;
        token: String;
    }
    
}

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

//express routes

app.get('/', (req: Request, res: Response) => {
    res.render("academyExperience", {
        title: 'Academy title',
    });     
});
