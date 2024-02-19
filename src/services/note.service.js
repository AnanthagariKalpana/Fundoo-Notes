import { error } from '@hapi/joi/lib/base';
import Notes from '../models/note.model';

export const newNote=async(body)=>
{
    const data = await Notes.create(body);
   // console.log(data)
   return data;
}

export const updateNote=async(body, id)=>{
    let data = await Notes.findOneAndUpdate({_id:id}, body, {new:true})
    if(!data)
    {
        throw new error("Not found")
    }
    return data;
   
}

//Get all the notes
export const getAll=async()=>{
    const note=await Notes.find()
    return note;
}
