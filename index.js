const express = require('express')
const bp = require('body-parser')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const LogInCollection = require("./mongo")
const port = 3000
const mongoose = require('mongoose')
// const { error } = require('console')
user="Log In Karlo"


app.use(bp.urlencoded({extended: true}))
app.use(bp.json())
app.use(express.static(path.join(__dirname, 'public')))


const tempelatePath = path.join(__dirname, '../DevChat2/templates')
app.set('view engine', 'hbs')
app.set('views', tempelatePath)

const io = require('socket.io')(http)

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/signup', async (req, res) => {
    
    const data = {
        name: req.body.name,
        password: req.body.password
    }
    try{
        await LogInCollection.insertMany([data])
        res.status(201).render("index")
    }
    catch(e){
        res.render("errorPage")
    }
})

app.post('/', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("chat")
            user = req.body.name
            console.log("Password Matches",`${user}`)
        }

        else {
            res.render("errorPage")

        }
    } 
    
    catch (e) {
        res.render("errorPage")
        console.log(e)
    }


})


//end

app.get('/chat', (req, res) => {
    res.send(user)
})


io.on('connection', (socket) => {
    console.log('Connected...')
    socket.emit('name', user)
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

http.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})