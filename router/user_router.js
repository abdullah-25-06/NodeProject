const {Router} = require('express')
const {Register,Login,Logout}= require ('../controller/user_controller')
const Auth = require('../middleware/checkAuth')
const user_router = Router()
user_router.route('/login').post(Login)
user_router.route('/register').post(Register)
user_router.route('/logout').post(Auth,Logout)



module.exports= user_router