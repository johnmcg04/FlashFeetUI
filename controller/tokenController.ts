import { Application, Request, Response } from "express";
import { jwtDecode } from "jwt-decode";
import { RoleID } from "../model/role";
import { DecodedJwt } from "../model/decodedjwt";

module.exports = function (app: Application) {
    // Route for homepage
    app.get("/", async (req: Request, res: Response) => {
        const decodedJwt: DecodedJwt = jwtDecode(req.session.token);
        if (decodedJwt.role_id == RoleID.Admin) {
            res.render('admin-menu')
            //res.redirect("admin-menu");
        }
        else if (decodedJwt.role_id == RoleID.User) {
            res.render("menu");
            //res.redirect("menu");

        }
        else {
            res.status(403).send("Access denied");
        }
    });

    // Admin menu route
    app.get("/admin-menu", async (req: Request, res: Response) => {
        const decodedJwt: DecodedJwt = jwtDecode(req.session.token);
        if (decodedJwt.role_id != RoleID.Admin) {
            return res.status(403).send("Access denied");
        }
        // If user is an admin, render the admin menu
        res.render("admin-menu");
    });

    // Logout route
    app.get("/logout", (req, res) => {
        // Clear the session or authentication token
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                return res.status(500).send("Error logging out");
            }
            // Redirect to the login page or any other page after logout
            res.redirect("/login");
        });
    });
};