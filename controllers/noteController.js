const noteModel = require('../models/noteModels')

const createNote =async(req,res)=>{
    const {title,description} = req.body;

    const newNote = new noteModel({
        title:title,
        description:description,
        userId:req.userId
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
    }
}

const updateNote =async (req,res)=>{
    const id = req.params.id;
    const {title,description} = req.body;

    const updateedNote ={
        title:title,
        description:description,
        userId:req.userId
    }

    try {
        await noteModel.findByIdAndUpdate(id,updateedNote,{new:true});
        res.status(200).json(updateedNote)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
    }
    
}

const deletNote =async (req,res)=>{
    const id = req.params.id;
    
    try {
        const note = await noteModel.findByIdAndDelete(id);
        res.status(202).json(note);
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
    }
}

const getNotes =async(req,res)=>{
    try {
        const notes = await noteModel.find({userId:req.userId});
        res.status(200).json(notes);

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Somthing went wrong"});
    }
    
}

module.exports ={
    createNote,
    updateNote,
    deletNote,
    getNotes
}