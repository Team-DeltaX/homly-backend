import { Server } from "socket.io";
import { Notification } from "../entities/Notification";

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
};

const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user: any) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return onlineUsers.find((user: any) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("addUser", (userId: string) => {
    if (userId) {
      addUser(userId, socket.id);
    }
  });

  socket.on(
    "newNotification",
    async ({ senderId, receiverId, data, type, time }) => {
      
      const notifiactions = Notification.create({
        receiverId,
        senderId,
        type,
        data,
        time: new Date(),
      });

      await notifiactions.save().then((res) => {
        const user = getUser(receiverId);
        if (user) {
          io.to(user.socketId).emit("notification", {
            id: res.id,
            type: type,
            data: data,
            senderId: senderId,
            time: time,
          });
        }
      });
      
    }
  );
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

export default io;
