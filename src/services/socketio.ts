import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let onlineUsers: any = [];

const addUser = (userId: string, socketId: string) => {
  const user = onlineUsers.find((user: any) => user.userId === userId);
  if (user) {
    user.socketId = socketId;
  } else {
    onlineUsers.push({ userId, socketId });
  }
  console.log(onlineUsers);
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user: any) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return onlineUsers.find((user: any) => user.userId === userId);
};

io.on("connection", (socket) => {
  io.emit("connection", "a user connected2");

  // when connect
  socket.on("addUser", (userId: string) => {
    console.log(userId + " id", socket.id + " socket id");
    if (userId) {
      addUser(userId, socket.id);
    }
  });

  socket.on("newNotification", ({ senderId, receiverId, data, type, time }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("notification", {
        id: uuidv4(),
        type: type,
        data: data,
        senderId: senderId,
        time: time,
      });
    }
  });

  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    removeUser(socket.id);
    console.log(onlineUsers);
  });
});

export default io;
