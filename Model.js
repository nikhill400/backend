const mongoose = require("mongoose")
const { Schema } = mongoose

const sampleSchema = new Schema ({ 
    Name :   { type : String } , 
    Email: { type : String },
    PhoneNumber : { type : Number }
},
{
    suppressReservedKeysWarning:true
}
);

module.exports = mongoose.model("api",sampleSchema)

