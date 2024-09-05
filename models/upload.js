import mongoose from "mongoose"

const uploadSchema = new mongoose.Schema({
    
    images : [
        {
        type : String,
        default : null
        }
    ]
},
{ timestamps: true })

const uploads = new mongoose.model('uploads', uploadSchema)

export default uploads;