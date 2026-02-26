require('dotenv').config();
const cors=require('cors');
const express = require('express'); 
const app = express();
const mongoose=require('mongoose')
app.use(cors())
const port = process.env.PORT
const url=process.env.URL
const contentRoutes = require('./routes/content.routes')
const usersRoutes = require('./routes/user.routes')
app.use(express.json()); 
app.use('/uploads', express.static('uploads'));  


app.use('/content',contentRoutes)
app.use('/users',usersRoutes)
app.use((req, res,next) => {     
  res.status(404).json({ message: 'route not found' });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message
  });
}); 

mongoose.connect(url).then(()=>{
    console.log('mongodb connected successfully');
}) 
 
app.listen(port,()=>{
    console.log(`app is listining on http://localhost:${port}`);
})

