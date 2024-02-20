import  express from "express";
import * as NoteController from '../controllers/note.controller';
import {userAuth} from "../middlewares/auth.middleware";

const router=express.Router();

//create a note
router.post('/',userAuth,NoteController.newNote);
//update the note
router.put('/:_id',userAuth,NoteController.updateNote);
//fetch all the notes
router.get('',userAuth,NoteController.getAll);
//Delete the note
router.delete('/:_id',userAuth,NoteController.deleteNote);
//Archive Note
router.put('/:_id/archive',userAuth,NoteController.archiveNote);
//Trash Note
router.put('/:_id/trash',userAuth,NoteController.trashNote);
//get SingleNote
router.get('/:_id/get',userAuth,NoteController.getNote);

export default router;