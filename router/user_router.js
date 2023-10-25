const {Router} = require('express')
const {Register,Login,Logout}= require ('../controller/user_controller')
const multer = require('multer')
const upload= multer({
    limits:{
        fileSize: 2000000 
    },
    fileFilter(req,file,cb){
        // if(!file.originalname.endsWith("jpg"))
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
        {
            return cb(new CustomErrorApi('Not an image file',400))
        }
        cb(undefined,true)}
})
const Auth = require('../middleware/checkAuth')
const CustomErrorApi = require('../error/error')
const asyncHandler = require('express-async-handler')
const User = require('../model/user')
const user_router = Router()
user_router.route('/login').post(Login)
user_router.route('/register').post(Register)
user_router.route('/logout').post(Auth,Logout)
// user_router.post("/me/avatar",upload.single('avatar'),async(req,res)=>{
//     req.user.avatar = req.file.buffer//access the binary file

//     await req.user.save()

//     return res.status(200).json({message: 'Submitted'})
// })
// //code to get image 
// user_router.get('/:id/avatar', asyncHandler(async (req, res) => {
//         const user = await User.findById(req.params.id)
//         res.set('Content-Type', 'image/jpeg')
//         res.send(user.avatar)
// }))

module.exports= user_router 