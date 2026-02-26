const asyncHandler=require('../middlewares/asyncHandler')
const User=require('../models/users.module')
const AppError=require('../utilities/AppError')
const statusText=require('../utilities/httpStatusText')
const bcrypt = require('bcrypt');
const {generateToken}=require('../utilities/tokenHandler')

    const getAllUsers = asyncHandler(async(req,res,next)=>{
    const users = await User.find()
    res.status(200).json({
    status:statusText.SUCCESS,
    data:users
    })
    })

    const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return next(new AppError('Email already exists', 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    poster: req.file ? req.file.path : undefined
  });

  const token = generateToken({ id: user._id, role: user.role });

  user.password = undefined;

  res.status(201).json({
    status: statusText.SUCCESS,
    message: "User created successfully",
    data: user,
    token
  });
    });

    const updateUser = asyncHandler(async(req,res,next)=>{
        const userId = req.params.userId
        const userToUpdate = await User.findByIdAndUpdate(userId,req.body,{new:true,runValidators:true})
        if(!userToUpdate){
            return next(new AppError('user not found',400))
        }
            res.status(200).json({
        status:statusText.SUCCESS,
        message:"user updated successfully",
        data:userToUpdate
    })
    })

    const deleteUser = asyncHandler(async(req,res,next)=>{
        const userId = req.params.userId
        const userToDelete = await User.findByIdAndDelete(userId)
        if(!userToDelete){
            next(new AppError('user not found'),400)
        }
        res.status(200).json({
            status:statusText.SUCCESS,
            message:"user deleted successfully"
        })
    })

    const userLogin = asyncHandler(async(req,res,next)=>{
     const {email,password}=req.body;
     const user = await User.findOne({email})
     if(!user){
     return next(new AppError('user not found',400))
     }
     const isMatch = await bcrypt.compare(password,user.password)
     if(!isMatch){
      return  next(new AppError('invalid password',400))
     }
     
        const token = generateToken({id:user._id,role:user.role})
        res.status(200).json({
            message:"logged in successfully",
            user,
            token
        })
     
    })

    const getCurrentUser = asyncHandler(async(req,res,next)=>{
        const userId = req.user.id
        const user = await User.findById(userId)
        if(!user){
            return next(new AppError('user not found',400))
        }
        res.status(200).json({
            data:user
        })
    })

    const getUserFavourite = asyncHandler(async(req,res,next)=>{
        const userId = req.user.id
        const user = await User.findById(userId).populate('favourite')
        if(!user){
            return next(new AppError('user not found',400))
        }
        res.status(200).json({
            data:user.favourite 
        })
    }) 

    const addToFavourite = asyncHandler(async(req,res,next)=>{
        const userId = req.user.id
        const contentId = req.params.contentId
        const user = await User.findById(userId)
        if(!user){
            return next(new AppError('user not found',400))
        }
        if(!contentId){
            return next(new AppError('content  id is not found',400))
        }
        if(user.favourite.includes(contentId)){
            return next(new AppError('already in favourites',400))
        }
        user.favourite.push(contentId)
        await user.save()
        res.status(200).json({
            message:"added to favourite successfully",
            favourite:user.favourite
        })
    })

    const removeFromFavourite = asyncHandler(async(req,res,next)=>{
        const userId = req.user.id
        const contentId = req.params.contentId
       const user = await User.findByIdAndUpdate(userId, { $pull: { favourite: contentId } },
        { new: true })
        if(!user){
            return next(new AppError('user not found',400))
        }
        res.status(200).json({
        message: "Removed from favourites successfully"
  });
    })

    module.exports={
        getAllUsers,
        createUser,
        updateUser,
        deleteUser,
        userLogin,
        getCurrentUser,
        getUserFavourite,
        addToFavourite,
        removeFromFavourite
    }  



