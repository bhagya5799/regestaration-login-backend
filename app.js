const { response, request } = require('express');
const express = require('express')
const mongoose = require('mongoose')
const RegistrationData = require('./model')
const AdminData = require('./admin')
const QuestionsData = require('./questions')
const cors = require('cors');
const admin = require('./admin');
const app = express()
app.use(express.json())
app.use(cors())

const mongooseData = mongoose.connect('mongodb+srv://bhagyashree:bhagya5799@cluster0.q2xpdj1.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log('db connected')
).catch(err => console.log(err, "DB error running"))

// user send details
app.post("/", async (request, response) => {
    const { name, password, email, id } = request.body

    try {
        const getData = await RegistrationData.find()
        let result = false
        getData.map(each => {
            if ((each.name == name) && (each.email == email)) {
                result = true
            }
        })
        if (result == true) {
            response.send("user already existed")
            response.status(400)
        }
        else {
            const newData = new RegistrationData({ name, email, password, id })
            await newData.save()
            const resVal = await RegistrationData.find()
            response.send(resVal)

        }

    }
    catch (err) {
        console.log(err.message)
    }
})

// admin post details registration
app.post("/admin", async (request, response) => {
    const { name, password, email, id } = request.body

    try {
        const getData = await AdminData.find()
        let result = false
        getData.map(each => {
            if ((each.name == name) && (each.email == email)) {
                result = true
            }
        })
        if (result == true) {
            response.send("user already existed")
            response.status(400)
        }
        else {
            const newData = new AdminData({ name, email, password, id })
            await newData.save()
            const resVal = await AdminData.find()
            response.send(resVal)
        }
    }
    catch (err) {
        console.log(err.message)
    }
})


// question Details
app.post("/question", async (request, response) => {
    const { question, masterName, masterId, id } = request.body

    try {
        const newData = new QuestionsData({ question, masterName, masterId, id })
        await newData.save()
        response.send({ status: true, msg: "update successful"})
    }
    catch (err) {
        console.log(err.message)
        
    }
})




// user login purpose
app.post('/login', async (request, response) => {
    const { password, email} = request.body
    try {
        const getPassword = await RegistrationData.find({ password: password })
        const getEmail = await RegistrationData.find({ email: email })
        let id=null
        getEmail.map(each =>{
            id=each.id
        })
      
        if (getPassword.length == 0) {
            response.send({ status: false, msg: "In valid Password"})
            response.status(400)

        }
        if (getEmail.length == 0) {
            response.send({ status: false, msg: "In valid Email" })
            response.status(400)

        }
        else {
            response.send({ status: true, msg: "login successful" ,id:id})
        }

    }
    catch (err) {
        console.log(err.message)
    }

})

// admin login
app.post('/adminLogin', async (request, response) => {
    const { password, email} = request.body
    try {
        const getPassword = await AdminData.find({ password: password })
        const getEmail = await AdminData.find({ email: email })
        let id=null;
        getEmail.map(each => {
            id=each.id
        })
        if (getPassword.length == 0) {
            response.send({ status: false, msg: "In valid Password" })
            response.status(400)

        }
        if (getEmail.length == 0) {
            response.send({ status: false, msg: "In valid Email" })
            response.status(400)

        }
        else {
            // response.send('login Successfully')
            response.send({ status: true, msg: "adminLogin  success" ,id:id})
        }

    }
    catch (err) {
        console.log(err.message)
    }

})


// user get all
app.get('/', async (require, response) => {
    try {
        const getData = await RegistrationData.find()
        response.send(getData)
    }
    catch (err) {
        response.send(err.message)
    }
})


// get all question
app.get('/all-questions', async (require, response) => {
    try {
        const getData = await QuestionsData.find()
        response.send(getData)
    }
    catch (err) {
        response.send(err.message)
    }
})

// get all admin
app.get('/all-admins', async (require, response) => {
    try {
        const getData = await AdminData.find()
        response.send(getData)
    }
    catch (err) {
        response.send(err.message)
    }
})

// get paricular question id
app.get('/getMaster-question/:id', async (request, response) => {
    const { id } = request.params
    try {
        const getData = await QuestionsData.find({masterId:id})
        response.send(getData)
    }
    catch (err) {
        response.send(err.message)
    }

})


app.get('/getOneData/:id', async (request, response) => {
    const { id } = request.params
    try {
        const idVal = await RegistrationData.find({ id: id })
        response.send(idVal)
    }
    catch (err) {
        console.log(err.message)
    }

})


app.put('/update/:id', async (request, response) => {
    const { id } = request.params
    try {
        await RegistrationData.findOneAndUpdate({ id: id }, request.body)
        response.send('updated successfully')

    }
    catch (err) {
        console.log(err.message)

    }
})


app.delete('/delete/:id', async (request, response) => {
    const { id } = request.params.id
    try {
        await RegistrationData.findOneAndDelete(id)
        return response.json(await RegistrationData.find())

    }
    catch (err) {
        console.log(err.message)
    }
})

app.get('/get-full-data/:id', async (request, response) => {
    const { id } = request.params
    try {
        const idVal = await AdminData.find({ id: id })
        response.send(idVal)
    }
    catch (err) {
        console.log(err.message)
    }

})



app.listen(process.env.PORT || 3009, () => console.log('running'))