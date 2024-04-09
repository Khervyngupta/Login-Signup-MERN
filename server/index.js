const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const RegisterModel = require('./models/registerModel')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/loginRegDB")

app.post("/register", (req, res) => {
    RegisterModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/updatePass', (req,res) => {
    const {email, password} = req.body;
    RegisterModel.findOne({email:email}, {
        password:password
    })
    .then(users => {
        if(!users){
            return res.send({status:"User not registered"})
        }
        console.log("Password Updated")
        res.json(users)
    })
    .catch(err => res.json(err))
})

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            }
            else{
                res.json("Wrong Password")
            }
        }
        else{
            res.json("User not registered")
        }
    })
})

app.listen(3001, () => {
    console.log("Server is running.")
})