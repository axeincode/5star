import VueSocketIO from 'vue-3-socket.io';

const socket = new VueSocketIO({
  debug: true,
  connection: import.meta.env.VITE_SOCKET_URL,
})

export default socket;