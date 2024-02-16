import { defineStore } from 'pinia'
import { NETWORK } from '@/net/NetworkCfg';
import { Network } from "@/net/Network1";
import type * as Socket from "@/interface/socket";
import { createWebSocket } from '@/plugins/socket';

export const socketStore = defineStore({
  id: 'socket',
  state: () => ({
    success: false as boolean,
    errMessage: '' as string,
    socket: null as any,
    socketBalance: {} as Socket.GetUserBalance
  }),
  getters: {
    getSuccess: (state) => state.success,
    getErrMessage: (state) => state.errMessage,
    getSocketBalance: (state) => state.socketBalance,
  },
  actions: {
    // set functions
    setSuccess(success: boolean) {
      this.success = success
    },
    setErrorMessage(message: string) {
      this.errMessage = message
    },
    setSocketBalance(socketBalance: Socket.GetUserBalance) {
      this.socketBalance = socketBalance;
    },
    // socket connect check
    async dispatchSocketConnect() {
      console.log('进来')
      this.setSuccess(false);
      const route: string = NETWORK.WEB_SOCKET.SOCKET_CONNECT;
      const network: Network = Network.getInstance();
      network.connect();
      this.socket = createWebSocket(route);
      this.socket.onopen = this.handleOpen;
      this.socket.onmessage = this.handleMessage;
      this.socket.onerror = this.handleError;
      this.socket.onclose = this.handleClose;
    },
    handleOpen() {
      console.log('WebSocket connection established');
    },
    handleMessage(event: MessageEvent) {
      console.log('Received message:', event.data);
      let response = JSON.parse(event.data);
      switch (response.mt) {
        case 101:
          this.setSocketBalance(response)
          break;
      }
    },
    handleError(event: Event) {
      console.error('WebSocket error:', event);
    },
    handleClose(event: CloseEvent) {
      console.log('WebSocket connection closed:', event);
    }
  }
})
