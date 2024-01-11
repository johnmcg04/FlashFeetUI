import { Response, Request } from "express";

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
