const mongoose=require('mongoose')

const RegistrationData = mongoose.schema = ({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    id:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model("registrationData", RegistrationData)
