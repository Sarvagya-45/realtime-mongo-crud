import { io } from "socket.io-client";

const socket = io("https://mongo-crud-app-lhgo.onrender.com");

socket.on("connect", () => {
  console.log("✅ Socket Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("❌ Socket Error:", err.message);
});

export default socket;
