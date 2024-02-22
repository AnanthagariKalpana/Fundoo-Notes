import { error } from '@hapi/joi/lib/base';
import Notes from '../models/note.model';
import { userAuth } from '../middlewares/auth.middleware';



export const newNote = async (body,userId) => {
    const data = await Notes.create({...body,userId:userId});
    // console.log(data)
    return data;
}

export const updateNote = async (body, id,userId) => {
    let data = await Notes.findOneAndUpdate({ _id: id,userId,userId }, body, { new: true })
    if (!data) {
        throw new error("Not found")
    }
    return data;

}

//Get all the notes
export const getAll = async (userId) => {
    
    const note = await Notes.find({userId:userId})
    return note;
}

//delete the Onenote
export const deleteNote = async (id,userId) => {
    const data = await Notes.findByIdAndDelete({_id:id,userId:userId})
    return data;
}

//ArchiveNote
export const archiveNote = async (noteId) => {
    const existNoteId = await Notes.findOne({ _id: noteId },{userId:userId})
    if (!existNoteId) {
        throw new Error('Note Not Found');
    }
    const updateNote = await Notes.findOneAndUpdate((noteId),{userId:userId},
        { $set: { archive: !existNoteId.archive } },
        { new: true })

    return updateNote;
}
//trashNote
export const trashNote = async (noteId) => {
    const existNoteId = await Notes.findOne({ _id: noteId },{userId:userId})
    if (!existNoteId) {
        throw new Error('Note Not Found');
    }
    const updateNote = await Notes.findOneAndUpdate((noteId),{userId:userId},
        { $set: { trash: !existNoteId.trash } }
        , { new: true })

    return updateNote;
}

//get single Note
export const getNoteById = async (_id,userId) => {
    const data = await Notes.findOne({_id:_id, userId:userId});
    return data;
  };