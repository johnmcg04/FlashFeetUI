import { Request, Response, Application } from "express";

module.exports = function(app: Application) {

    app.get("/admin-menu", async (req: Request, res: Response) => {
        res.render("admin-menu");
    });
};
