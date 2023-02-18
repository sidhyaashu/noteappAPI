const express = require("express");
const { getNotes, createNote, updateNote, deletNote } = require("../controllers/noteController");
const auth = require("../middlewere/auth");
const noteRoute = express.Router();


noteRoute.get("/", auth ,getNotes);
noteRoute.post("/", auth ,createNote);
noteRoute.put("/:id", auth ,updateNote);
noteRoute.delete("/:id", auth ,deletNote);


module.exports = noteRoute