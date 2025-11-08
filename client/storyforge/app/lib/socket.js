import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    const token = localStorage.getItem("accessToken");

    socket = io(`${process.env.NEXT_PUBLIC_BACKEND_DEV_URL}`, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token,
      },
    });

    socket.on("connect_error", (error) => {
      console.log("❌ Socket connection error: ", error);
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Socket disconnected:", reason);
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
