(function () {
  "use strict";

  var path = require('path');
  var app = require('express')();
  var WebSocketServer = require('ws').Server;
  var CLIENTS = [];

  require('dotenv').config({silent: true});

  let wssPort = process.env.WSS_PORT || 6005;
  const wss = new WebSocketServer({ port: wssPort });

  wss.on('connection', (ws) => {
    console.log("User Connected");

    ws.on('message', (message) => {
      console.log('Received: ' + message);

      message = JSON.parse(message);

      if (message.event === "auth") {
        // message.status = "authorized";
        let response = {
          event : "auth",
          success : true
        };
        ws.send(JSON.stringify(response));

      } else if (message.event === "add_protocol") {
        ws.send("add_protocol");
      }
      // } else if (message.event === )


      // ws.send("Hello");
      ws.on('close', (client) => {
        CLIENTS.slice(CLIENTS.indexOf(client), 1);
        console.log("Client Disconnected");
      });
      ws.on('error', (client) => {
        CLIENTS.slice(CLIENTS.indexOf(client), 1);
      });
    });

    ws.send("Welcome to WebSocket Server");
  });


  app.get('/', function (req, res) {
    console.log("request in \\");
    res.send("<h1>WebSocket Node.JS");
  });

  let port = process.env.PORT || 3001;

  app.listen(port, () => console.log("listening on http://localhost:" + port));

})();