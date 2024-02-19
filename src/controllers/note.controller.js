import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service'



export const newNote = async (req, res, next) => {
    try {
      const data = await NoteService.newNote(req.body);
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
      const data = await NoteService.updateNote(req.body);
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Note updated successfully'
      });
    } catch (error) {
      next(error);
    }
  };
