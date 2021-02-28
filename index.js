const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const request = require('request')
const mongoose = require('mongoose')
const Customer = require('./server/Customer')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 4200

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "build")))
app.use(cors())

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if (error) throw error
})

const DB_USER = {
    username: 'hydsoled',
    password: 'Dato123'
}

app.post('/searchUser', verifyUser, async (req, res, next) => {
    let api = process.env.API_URL
    const cookieString = 'insert your instagram cookie'
    api = api.replace('{key}', req.body.user)
    const data = await new Promise((resolve, reject) => {
        request({
            uri: api,
            method: "GET",
            headers: {'content-type': 'application/json', cookie: cookieString}
        }, (err, response) => {
            if (err) {
                reject(err)
            } else {
                resolve(response.body)
            }
        })
    })
    res.send(data)
})

app.post('/saveUser', verifyUser,async (req, res) => {
    const customer = req.body
    const data = await new Promise((resolve, reject) => {
        new Customer(
            {
                image_path: customer.image_path,
                type: customer.type,
                username: customer.username,
                media_count: customer.media_count
            }
        ).save((error) => {
            if (error) {
                console.log('error in insert data', error)
                resolve(false)
                return
            }
            resolve(true)
        })
    })
    res.send(data)
})

app.post('/deleteUser', verifyUser,async (req, res) => {
    const customer = req.body
    const data = await new Promise((resolve, reject) => {
        const option = {image_path: customer.image_path}
        Customer.deleteOne(option).then(function () {
            console.log("Data deleted"); // Success
            resolve(true)
        }).catch(function (error) {
            console.log(error); // Failure
            resolve(false)
        });
    })
    res.send(data)
})

app.post('/updateUser', verifyUser,async (req, res) => {
    const customer = req.body
    const data = await new Promise((resolve, reject) => {
        const query = {image_path: customer.image_path}
        const update = {$set: {username: customer.username, type: customer.type}}
        Customer.updateOne(query, update).then(() => {
            resolve(true)
        }).catch(() => {
            resolve(false)
        })
    })
    res.send(data)
})
app.get('/getUser',verifyUser, async (req, res) => {
    const data = await new Promise((resolve, reject) => {
        Customer.find({}).then((response) => {
            resolve(response)
        })
    })
    res.send(data)
})

app.post('/login', (req, res) => {
    if (DB_USER.username === req.body.username && req.body.password === DB_USER.password) {
        const username = req.body.username
        const user = {user: username, pass: req.body.password}
        const accessToken = jwt.sign(user, process.env.SECRET)
        res.cookie('authorization', accessToken)
        res.json({accessToken: accessToken})
    } else {
        res.sendStatus(403)
    }
})

function verifyUser(req, res, next) {
    const header = req.headers['authorization']
    const token = header && header.split('=')[1]
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (error, user) => {
        if (error) return res.sendStatus(403)
        next()
    })
}

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})