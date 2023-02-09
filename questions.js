const mongoose = require('mongoose')

const QuestionsData = mongoose.schema = ({
    question:{
        type: String,
        required: true

    },
    id:{
        type:String,
        required:true
    },
    masterName:{
        type:String,
        required:true
    },
    masterId:{
        type:String,
        required:true
    }

})
module.exports = mongoose.model("questionsData", QuestionsData)
