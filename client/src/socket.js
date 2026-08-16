import { io } from "socket.io-client";

const socket = io("https://mongo-crud-app-lhgo.onrender.com");

export default socket;
