import Notes from '../models/note.model';

export const newNote=async(body)=>
{
    const data = await Notes.create(body);
    console.log(data)
}

export const updateNote=async(body)=>{
    if(body._Id)
    {
    await Notes.findByIdAndUpdate(body._Id,body)
    }
   
}
