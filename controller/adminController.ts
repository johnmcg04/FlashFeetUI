import { Request, Response, Application } from "express";
import { Login } from "../model/auth";
const authService = require("../service/AuthService");

module.exports = function(app: Application) {

    app.get("/admin-menu", async (req: Request, res: Response) => {
        res.render("admin-menu");
    });
};
