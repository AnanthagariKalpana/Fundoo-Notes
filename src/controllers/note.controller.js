import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service'
import { log } from 'winston';



export const newNote = async (req, res, next) => {
    try {
      const data = await NoteService.newNote(req.body,req.user.id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateNote = async (req, res, next) => {
    try {
      const data = await NoteService.updateNote(req.body, req.params._id,req.user.id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const getAll = async (req, res, next) => {
    try {
      console.log(req.user.id)
      const data = await NoteService.getAll(req.user.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'All notes fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const deleteNote = async (req, res, next) => {
    try {
      const data = await NoteService.deleteNote(req.params._id,req.user.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'note deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const archiveNote = async (req, res, next) => {
    try {
      const noteId=req.params._id;
      const data = await NoteService.archiveNote(noteId,req.user.id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note has Archived successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const trashNote = async (req, res, next) => {
    try {
      const noteId=req.params._id;
      const data = await NoteService.trashNote(noteId,req.user.id);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note has trashed successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  export const getNoteById = async (req, res, next) => {
    try {
      const data = await NoteService.getNoteById(req.params._id,req.user.id);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: ' note fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };


