const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000

let app = express()
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('src'));

let server = require('http').createServer(app)
let io = require('socket.io')(server)

server.listen(PORT, () => {
	console.log(`You are listening at 0:0:0:${PORT}`)
})

io.on('connection', socket => {
	console.log('socket connected')
	socket.on('join', name => {
		socket.nickname = name
		socket.broadcast.emit('announcement', name + ' join the chat')
	})
	socket.on('chat', msg => {
		console.log(`${socket.nickname} say ${msg}`)
		socket.broadcast.emit('chat', socket.nickname, msg)
	})
})
