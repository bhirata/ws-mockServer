var path = require('path');
var app = require('express')();
var WebSocketServer = require('ws').Server;
var CLIENTS = [];

const wss = new WebSocketServer({ port: 3002 });

wss.on('connection', (ws) => {

  console.log("user connected");

  CLIENTS.push(ws);
  ws.on('auth', (auth) => {
    let authObj = {
      "event" : "auth",
      "success" : true
    };

    console.log("auth");
    ws.send(authObj);
  });

  ws.on('message', (message) => {
    console.log('Received: ' + message);
    ws.send("Hello");
  });

  ws.on('close', (client) => {
    CLIENTS.slice(CLIENTS.indexOf(client), 1);
    console.log("Client Disconnected");
  });
  ws.on('error', (client) => {
    CLIENTS.slice(CLIENTS.indexOf(client), 1);
  });

  ws.send("Welcome to WebSocket Server");

});

app.get('/', function (req, res) {
  console.log("request in \\");
  res.send("<h1>WebSocket Node.JS");
});

app.listen(3001, () => console.log("listening on http://localhost:3001"));