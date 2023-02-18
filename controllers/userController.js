const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SIDHYAASUTOSH"

const signup=async(req,res)=>{

    const {username,email,password} = req.body;

    try {
        const existingUser =await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"});
        }

        const hashPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            email:email,
            password:hashPassword,
            username:username
        });

        const token = jwt.sign({email:result.email,id:result._id},SECRET_KEY);
        res.status(201).json({message:"User create succesfully",user:result,token:token});


    } catch (error) {
        res.status(500).json({message:"Somthing went wrong"})
    }
}

const signin=async(req,res)=>{

    const {email,password} = req.body;
    try {
        const existingUser =await userModel.findOne({email:email});
        if(!existingUser){
            return res.status(404).json({message:"User note found"});
        }

        const matchPassword = await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},SECRET_KEY);
        res.status(201).json({message:"User Login succesfully",user:existingUser,token:token});

    } catch (error) {
        res.status(500).json({message:"Somthing went wrong"})
    }
}

module.exports = {signup,signin}