import  express from "express";
import * as NoteController from '../controllers/note.controller';
import {userAuth} from "../middlewares/auth.middleware";
import getAllNotes  from "../middlewares/redis.middleware";


const router=express.Router();

//create a note
router.post('',userAuth,NoteController.newNote);
//update the note
router.put('/:_id',userAuth,NoteController.updateNote);
//fetch all the notes
router.get('',userAuth,getAllNotes,NoteController.getAll);
//get SingleNote
router.get('/:_id',userAuth,NoteController.getNoteById);
//Delete the note
router.delete('/:_id',userAuth,NoteController.deleteNote);
//Archive Note
router.put('/:_id/archive',userAuth,NoteController.archiveNote);
//Trash Note
router.put('/:_id/trash',userAuth,NoteController.trashNote);


export default router;