import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: "",
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data.data });
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (id) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${id}`);
      set({ messages: res.data.data });
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  setSelectedUser: (selectedUser) => {
    // Update the store with the selected user
    set({ selectedUser });
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      // Send the message to the server
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // Update the store with the new message
      set({
        messages: [...messages, res.data.data],
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));
