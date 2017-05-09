
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 1500;

app.use(express.static(__dirname + '/public'));
var bots = [];
myBot = {}
myBot.x = 40;
myBot.y = 100;
myBot.r = 15;
myBot.theta = 0;
myBot.color = "green";

function botStatus(data){
	bots.push(data);
}

function onConnection(socket){
	console.log(myBot);
	socket.broadcast.emit('drawing', myBot);
	function drawAllBots(){
		for(i=0; i<bots.length; i++){
			socket.broadcast.emit('drawing', bots[i]);
		}
	}
	function onDrawing(data){
		console.log("onDrawing",data);
		botStatus(data);
		drawAllBots();
		//socket.broadcast.emit('drawing', data);
	}
  socket.on('drawing', onDrawing);
  //socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));