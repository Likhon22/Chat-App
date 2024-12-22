import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  isLogging: false,
  isMe: false,
  socket: null,
  profileUser: null,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      get().connectSocket();

      set({ authUser: res.data.data });
    } catch (err) {
      set({ authUser: null });
      console.error(err);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/users/create-user", data);
      set({ authUser: res.data });
      return { success: true, data: res.data };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: err.response ? err.response.data : err.message,
      };
    } finally {
      set({ isSigningIn: false, authUser: null });
    }
  },
  login: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.data });
      get().connectSocket();
      return { success: true, data: res.data };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        error: err.response ? err.response.data : err.message,
      };
    } finally {
      set({ isLogging: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");

      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (err) {
      console.error(err);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.patch("/users/update-profile", data);
      set({ authUser: res.data.data });
      set({ profileUser: res.data.data });
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  getMe: async () => {
    try {
      set({ isMe: true });

      const res = await axiosInstance.get(`/users/me`);
      set({ profileUser: res.data.data });
    } catch (err) {
      console.error(err);
      set({ profileUser: null });
      return {
        success: false,
        error: err.response ? err.response.data : err.message,
      };
    } finally {
      set({ isMe: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser?._id,
      },
    });
    socket.connect();

    set({ socket });
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) {
      get().socket.disconnect();
    }
  },
  
}));
