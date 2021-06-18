
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const app = express();
//importing routes
const authRoutes = require('./Routes/auth');
const userRoutes=require('./Routes/user');
const appointmentRoutes =require('./Routes/appointment')
const clinicRoutes = require('./Routes/clinic')
const doctorRoutes = require('./Routes/doctor')
const medicineRoutes = require('./Routes/medicine')
const symptomRoutes = require('./Routes/symptom')

//db connection
mongoose.connect(process.env.DATABASE, 
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() =>{
    console.log('CONNECTION SUCESSFULL');
}).catch(err =>{
    console.log(err);
});
//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors());
//routes(api)
app.use("/api",authRoutes);
app.use("/api",userRoutes);
app.use("/api",appointmentRoutes)
app.use("/api",clinicRoutes);
app.use("/api",doctorRoutes);
app.use("/api",medicineRoutes);
app.use("/api",symptomRoutes);
//port
  const PORT=process.env.PORT||5500;
  app.get('/', (req, res) => {
  res.send("hey there")
  });
app.listen(PORT,()=>{
    console.log(`LISTENING ON THE PORT: ${PORT}`);
})



