import Notes from '../models/note.model';

export const newNote=async(body)=>
{
    const data = await Notes.create(body);
    console.log(data)
}