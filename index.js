const express = require('express')
const bp = require('body-parser')
const app = express()
const http = require('http').createServer(app)
const path = require('path')
const port = 3000
app.use(bp.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
var user = ""

app.get('/chat', (req, res) => {
    res.send(user)
})

app.post("/" ,(req,res) => {
    user = req.body.User
    // res.send("Hi "+user)
    res.sendFile(path.join(__dirname,"chat.html"))

})

const io = require('socket.io')(http)

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