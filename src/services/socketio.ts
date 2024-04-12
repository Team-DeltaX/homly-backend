import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


let onlineUsers: any = [];

const addUser = (userId: string, socketId: string) => {
    !onlineUsers.some((user: any) => user.userId === userId) &&
        onlineUsers.push({ userId, socketId });
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
        addUser(userId, socket.id);
    });

    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
    });
});

export default io;
