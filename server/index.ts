import { monitor } from '@colyseus/monitor';
import { Server } from 'colyseus';
import * as express from 'express';
import { createServer } from 'http';
import * as path from 'path';
import * as serveIndex from 'serve-index';

const port = Number(process.env.PORT || 2567);
const app = express();

// Attach WebSocket Server on HTTP Server.
const gameServer = new Server({
  server: createServer(app),
});

// Register ChatRoom as "chat"
// gameServer.register("chat", ChatRoom);

// // Register ChatRoom with initial options, as "chat_with_options"
// // onInit(options) will receive client join options + options registered here.
// gameServer.register("chat_with_options", ChatRoom, {
//     custom_options: "you can use me on Room#onInit"
// });

// // Register StateHandlerRoom as "state_handler"
// gameServer.register("state_handler", StateHandlerRoom);

// // Register StateHandlerRoom as "state_handler"
// gameServer.register("auth", AuthRoom);

// // Register CreateOrJoin as "create_or_join"
// gameServer.register("create_or_join", CreateOrJoinRoom);

app.use('/', express.static(path.join(__dirname, 'static')));
app.use('/', serveIndex(path.join(__dirname, 'static'), { icons: true }));

// (optional) attach web monitoring panel
app.use('/colyseus', monitor(gameServer));

gameServer.onShutdown(() => {
  console.log(`game server is going down.`);
});

gameServer.listen(port);
console.log(`Listening on http://localhost:${port}`);
