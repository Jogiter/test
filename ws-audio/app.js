const express = require('express')
const app = express()
var server = require('http').createServer(app)
const WebSocket = require('ws')
const io = new WebSocket.Server({
	server: server
})

app.use(express.static('public'))

io.on('connection', socket => {
	console.log('socket is connected')
	socket.on('message', msg => {
		console.log(`got ${msg}`)
	})
	require('fs').readFile('Lukas Graham - 7 Years.mp3', (err, res) => {
		socket.send(res)
	})
})

server.listen(3000, () => {
	console.log('server is listening at 3000')
})
