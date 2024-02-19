import  express from "express";
import * as NoteController from '../controllers/note.controller';

const router=express.Router();

//create a note
router.post('/create',NoteController.newNote);

export default router;