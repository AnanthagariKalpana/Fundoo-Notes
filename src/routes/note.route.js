import  express from "express";
import * as NoteController from '../controllers/note.controller';

const router=express.Router();

//create a note
router.post('/create',NoteController.newNote);
//update the note
router.post('/:_id',NoteController.updateNote);
//fetch all the notes
router.get('/get',NoteController.getAll);

export default router;