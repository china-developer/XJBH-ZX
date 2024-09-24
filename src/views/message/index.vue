<template>
  <div>
    <el-button @click="sendMessage">发送</el-button>
  </div>
</template>

<script setup>
import { io } from "socket.io-client";
const socket = io("http://localhost:3031");
socket.on("connect", () => {
  console.log(socket.connected); // true
});

socket.on("disconnect", () => {
  console.log(socket.connected); // false
});

const message = ref("");
const response = ref("");

const sendMessage = () => {
  socket.emit("message", message.value);
};

onMounted(() => {
  socket.on("response", (data) => {
    response.value = data;
  });
});



// const websocketUrl = 'ws://192.168.2.231:5000';
// let socket;

// const connectWebSocket = () => {
//     socket = new WebSocket(websocketUrl);

//     socket.onopen = () => {
//         console.log('WebSocket connected');
//     };

//     socket.onmessage = (event) => {
//         console.log('Received:', event.data);
//     };

//     socket.onclose = () => {
//         console.log('WebSocket disconnected');
//     };

//     socket.onerror = (error) => {
//         console.error('WebSocket error:', error);
//     };
// };

// connectWebSocket()

// const sendMessage = (message) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//         socket.send(message);
//     }
// };
</script>

<style lang="scss" scoped></style>
