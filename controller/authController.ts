import { Request, Response, Application } from "express"
import { Login } from "../model/auth"

const authService = require("../service/AuthService");


module.exports = function(app: Application) {

    app.get('/login', async (req: Request, res: Response) => {
        res.render('login')
    })

    app.post('/login', async (req: Request, res: Response) => {
        let data: Login = req.body

        try{
            req.session.token = await authService.login(data)

            res.redirect('/jobroles')
        }
        catch(e){
            console.log(e)

            res.locals.errormessage = e.message

            res.render('login', req.body)
        }
    })
}