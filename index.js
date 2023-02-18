const express = require("express");
const noteRoute = require("./routes/noteRoutes");
const userRoute = require("./routes/userRoutes");
const app = express();
const BD = "mongodb+srv://cheezy:jSVb77G53Cuxu1cD@cluster0.qqsuq7n.mongodb.net/cheesycollection?retryWrites=true&w=majority"

const mongoose =require("mongoose");
app.use(express.json());

app.use("/user",userRoute);
app.use("/note",noteRoute);

app.get("/",(req,res)=>{
    res.send("Hi i am from server")
})





mongoose.connect(BD).then(()=>{

    app.listen(3000,()=>{
        console.log("Server is listining on port 3000")
    })

}).catch((error)=>{
    console.log(error)
})