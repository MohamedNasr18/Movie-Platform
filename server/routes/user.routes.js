const express=require('express')
const router = express.Router()
const {getAllUsers,createUser,updateUser,deleteUser,
    userLogin,getCurrentUser,getUserFavourite,addToFavourite,removeFromFavourite}=require('../controllers/user.controller')
const validate = require('../middlewares/validate')
const userValidator = require('../validators/user.validator')
const upload=require('../middlewares/upload')
const authenticate=require('../middlewares/authenticate')
const allowTo=require('../middlewares/allowTo')

router.route('/')
.get(getAllUsers)
.post(upload.single('poster'),validate(userValidator),createUser)

router.route('/:userId')
.patch(authenticate,allowTo("ADMIN"),updateUser)
.delete(authenticate,allowTo("ADMIN"), deleteUser)

router.route('/login')
.post(userLogin)

router.route('/me')
.get(authenticate,getCurrentUser)

router.route('/me/favourite')
.get(authenticate,getUserFavourite)
router.route('/me/favourite/:contentId')
.post(authenticate,addToFavourite)

router.route('/me/favourite/:contentId')
.patch(authenticate,removeFromFavourite)
 
module.exports=router