const express= require('express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const path = require('path');

dotenv.config();


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err));




const adminRoutes=require('./routes/adminRoute');
const userRoutes=require('./routes/userRoute');
const authorRoutes=require('./routes/authorRoute');
const postRoutes=require('./routes/postRoute');
const classRoutes=require('./routes/classRoute');
const webinarRoute=require('./routes/webinarRoute');
const subjectRoutes=require('./routes/subjectRoute');
const experimentRoutes=require('./routes/experimentRoute');
const productRoutes=require('./routes/productRoute');
const eventRoutes=require('./routes/eventRoute');
// const otpRoutes=require('./routes/otpRoute');
const bodyParser=require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
// app.use('/api',otpRoutes);
app.use('/author',authorRoutes);
app.use('/posts',postRoutes);
app.use('/webinars',webinarRoute);

app.use('/classes',classRoutes);
app.use('/subjects',subjectRoutes);
app.use('/experiments',experimentRoutes);
app.use('/products',productRoutes);
app.use('/events',eventRoutes);
//mongodb connection

const PORT=4000;




app.use('/home',(req,res)=>{
    res.send("<h2>Ombrello</h2>");
})
app.get('/', (req, res) => {
    res.send('Hello World, from express');
})

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server Running At ${PORT}`);
})