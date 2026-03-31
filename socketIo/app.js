import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";

dotenv.config();

const app = express();

const Port = process.env.Port;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const waitingQueue = [];
const activePair = new Map();

io.on("connection", (socket) => {
  if (waitingQueue.includes(socket.id)) {
    return; 
  }

  socket.on("start", () => {
    if (waitingQueue.length > 0) {
      const partner = waitingQueue.shift();
      const roomId = uuid();

      activePair.set(socket.id, partner);
      activePair.set(partner, socket.id);

      socket.emit("matched", { roomId });
      socket.to(partner).emit("matched", { roomId });
    } else {
      waitingQueue.push(socket.id);
      socket.emit("waiting");
    }
  });

  socket.on("next",()=>{
    handleLeave(socket.id);
  })

  socket.on("disconnect",()=>{
    handleLeave(socket.id);
  })

  const handleLeave=(id)=>{
    const wid=waitingQueue.indexOf(id);
    if(wid!==-1){
      waitingQueue.splice(wid,1);
    }
    const partner=activePair.get(id);
    if(partner){
      io.to(partner).emit("partner_left");
      activePair.delete(id);
      activePair.delete(partner);
    }

  }
});

server.listen(Port, () => {
  console.log(`listen at ${Port}`);
});
