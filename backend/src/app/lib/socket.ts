import { Server, ServerOptions, Socket } from "socket.io";

import http, { Server as HTTPServer } from "http";
import app from "../../app";
import { TUserSocketMap } from "../interface/socket";

const server: HTTPServer = http.createServer(app);
const io: Server = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
} as Partial<ServerOptions>);

const userSocketMap: TUserSocketMap = {};

export const getReceiverSocketId = (userId: string) => {
  return userSocketMap[userId];
};
io.on("connection", (socket: Socket) => {
  const userId = socket.handshake.query.userId as string;
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  //
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  console.log(Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log(`a user disconnected: ${socket.id}`);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server };
