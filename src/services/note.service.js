import { error } from '@hapi/joi/lib/base';
import Notes from '../models/note.model';
import { userAuth } from '../middlewares/auth.middleware';

export const newNote = async (body) => {
    const data = await Notes.create(body);
    // console.log(data)
    return data;
}

export const updateNote = async (body, id) => {
    let data = await Notes.findOneAndUpdate({ _id: id }, body, { new: true })
    if (!data) {
        throw new error("Not found")
    }
    return data;

}

//Get all the notes
export const getAll = async () => {
    const note = await Notes.find(userAuth.id)
    return note;
}

//delete the Onenote
export const delNote = async (id) => {
    const data = await Notes.findByIdAndDelete(id,userAuth.id)
    return data;
}

//ArchiveNote
export const archiveNote = async (noteId) => {
    const existNoteId = await Notes.findOne({ _id: noteId },userAuth.id)
    if (!existNoteId) {
        throw new Error('Note Not Found');
    }
    const updateNote = await Notes.findOneAndUpdate((noteId),userAuth.id,
        { $set: { archive: !existNoteId.archive } },
        { new: true })

    return updateNote;
}
//trashNote
export const trashNote = async (noteId) => {
    const existNoteId = await Notes.findOne({ _id: noteId },userAuth.id)
    if (!existNoteId) {
        throw new Error('Note Not Found');
    }
    const updateNote = await Notes.findOneAndUpdate((noteId),userAuth.id,
        { $set: { trash: !existNoteId.trash } }
        , { new: true })

    return updateNote;
}

//get single Note
export const getNote = async (id) => {
    const data = await Notes.findById(id,userAuth.id);
    return data;
  };