const express = require('express')
const router = express.Router();
const {getAllContent,createContent,updateContent,deleteContent, getSingleContent}=require('../controllers/content.controller')
const contentValidator=require('../validators/content.validator')
const validate=require('../middlewares/validate')
const upload=require('../middlewares/upload')
const authenticate = require('../middlewares/authenticate')
const allowTo = require('../middlewares/allowTo')

router.route('/')
.get(getAllContent)
.post(authenticate,allowTo("ADMIN"), upload.single('poster'), validate(contentValidator),createContent) 

router.route('/:contentId')
.patch(authenticate,allowTo("ADMIN"), upload.single('poster'),updateContent)
.delete(authenticate,allowTo("ADMIN"),deleteContent)

router.route('/:contentId')
.get(getSingleContent)

module.exports=router; 