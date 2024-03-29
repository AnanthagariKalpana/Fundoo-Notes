
import boolean from "@hapi/joi/lib/types/boolean";
import { Schema, model } from "mongoose";

const noteSchema=new Schema(
    {
        title:{
            type:String,
            required:true
        },
 
        description:{
            type:String,
            required:true
        },

        colour:{
            type:String
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:"users",
            required:true
        },
        archive :{
            type : Boolean,
            default:false
        },
        trash:{
            type:Boolean,
            default:false
        }
    },

    {
        timestamps: true
    }
)

export default model('Notes', noteSchema);