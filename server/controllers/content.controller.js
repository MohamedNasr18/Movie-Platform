const asyncHandler=require('../middlewares/asyncHandler');
const Content=require('../models/content.module');
const AppError = require('../utilities/AppError');
const statusText= require('../utilities/httpStatusText')

const getAllContent=asyncHandler(async(req,res,next)=>{
const contents = await Content.find()
res.json({status:statusText.SUCCESS, data:contents})
});

const getSingleContent = asyncHandler(async(req,res,next)=>{
const contentId = req.params.contentId
const contnet = await Content.findById(contentId)
if(!contnet){
    return next(new AppError('content not found',404))
}
res.status(200).json({
   data: contnet
})
})

const createContent = asyncHandler(async (req, res, next) => {
  const { title, type, genres,
          duration, cast, hero, story,
           director, rating, seasons,
            episodes } = req.body;

  const newContent = await Content.create({
    title,
    type,
    genres,
    duration,
    cast,
    hero,
    story,
    director,
    rating,
    seasons,
    episodes,
    poster:req.file ? req.file.path : undefined
  });

  res.status(201).json({
    status:statusText.SUCCESS,
    message: "Content created successfully",
    data: newContent,
  });
});

const updateContent = asyncHandler(async (req, res, next) => {
  const contentId = req.params.contentId;

  const updateData = {
    ...req.body,
    ...(req.file && { poster: req.file.path }),
  };

  const contentToUpdate = await Content.findByIdAndUpdate(
    contentId,
    updateData,
    { new: true, runValidators: true } 
  );

  if (!contentToUpdate) {
    return next(new AppError('Content not found', 400));
  }

  res.status(200).json({
    status: statusText.SUCCESS,
    message: "Content updated successfully",
    data: contentToUpdate,
  });
});

const deleteContent=asyncHandler(async(req,res,next)=>{
    const contentId=req.params.contentId
    const contentToDelete = await Content.findByIdAndDelete(contentId)
    if(!contentToDelete){
       return next(new AppError('content not found'),400)
    }
    res.status(200).json({
        status:statusText.SUCCESS,
        message:"user deleted successfully",
        })
})

module.exports={
    getAllContent,
    createContent,
    updateContent,
    deleteContent,
    getSingleContent
}