import { io } from "socket.io-client";

const socket = io("https://realtime-mongo-crud.onrender.com");

export default socket;
