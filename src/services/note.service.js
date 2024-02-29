import { error } from '@hapi/joi/lib/base';
import Notes from '../models/note.model';
import { client } from '../config/redis';




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
    console.log(userId);
    
    const note = await Notes.find({userId:userId})
    //getting the notes from Redis Database
    const key=userId;
    await client.set(key,JSON.stringify(note));
    return note;
}

//delete the Onenote
export const deleteNote = async (id,userId) => {
    const data = await Notes.findByIdAndDelete({_id:id,userId:userId})
    return data;
}

//ArchiveNote
export const archiveNote = async (noteId,userId) => {
    const existNoteId = await Notes.findOne({ _id: noteId ,userId})
    if (!existNoteId) {
        throw new Error('Note Not Found');
    }
    const updateNote = await Notes.findOneAndUpdate({ _id: noteId ,userId},
        { $set: { archive: !existNoteId.archive } },
        { new: true })

    return updateNote;
}
//trashNote
export const trashNote = async (noteId,userId) => {
    const existNoteId = await Notes.findOne({ _id: noteId ,userId})
    if (!existNoteId) {
        throw new Error('Note Not Found');
    }
    const updateNote = await Notes.findOneAndUpdate({ _id: noteId ,userId},
        { $set: { trash: !existNoteId.trash } }
        , { new: true })

    return updateNote;
}

//get single Note
export const getNoteById = async (_id,userId) => {
    const data = await Notes.findOne({_id:_id, userId:userId});
    return data;
  };