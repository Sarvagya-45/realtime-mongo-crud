import { io } from "socket.io-client";

const socket = io("https://realtime-mongo-crud.onrender.com", {
  transports: ["websocket", "polling"],
});

socket.on("connect", () => {
  console.log("✅ Connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.log("❌ Connect Error:", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("🔴 Disconnected:", reason);
});

export default socket;
