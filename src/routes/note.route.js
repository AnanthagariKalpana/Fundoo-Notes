import  express from "express";
import * as NoteController from '../controllers/note.controller';

const router=express.Router();

//create a note
router.post('/create',NoteController.newNote);
//update the note
router.post('/update',NoteController.updateNote);

export default router;