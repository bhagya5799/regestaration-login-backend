const mongoose = require('mongoose')

const AdminData = mongoose.schema = ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("adminData", AdminData)
