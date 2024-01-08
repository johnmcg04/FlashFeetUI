import { NextFunction, Request, Response } from "express"; 
const authService = require("../service/AuthService");

module.exports = function (req: Request, res: Response, next: NextFunction) {
    if (req.url == '/signup') {
        res.redirect('/signup');
        return;
    }
    if (req.session.token && req.session.token.length > 0) {
        // Check if the user has the necessary permissions to access the requested page
        if (req.url.startsWith('/admin') && !req.session.isAdmin) {
            res.redirect('/unauthorized');
            return;
        }
        next();
    } else {
        res.redirect("/login");
    }    
};
