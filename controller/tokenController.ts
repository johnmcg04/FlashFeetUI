import { Application, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { RoleID } from "../model/role";
import { DecodedJwt } from "../model/decodedjwt";

module.exports = function (app: Application) {
    // Route for homepage
    app.get("/", async (req: Request, res: Response) => {
        const decodedJwt: DecodedJwt = jwtDecode(req.session.token);
        if (decodedJwt.role_id == RoleID.Admin) {
            res.redirect("admin-menu");
            res.render("admin-menu"); //admin login
        }
        else if (decodedJwt.role_id == RoleID.User) {
            console.log(req.session.id)
            res.render("menu"); //normal user login
            res.redirect("menu");
        }
    });

    // Logout route
    app.get("/logout", (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Error logging out");
            }
            // Redirect to the login page after logout
            res.redirect("/login");
        });
    });
};