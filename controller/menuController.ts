import { Request, Response, Application } from "express";

module.exports = function(app: Application) {

    app.get("/menu", async (req: Request, res: Response) => {
        res.render("menu");
    });
};
