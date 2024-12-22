import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    getMessages,
    messages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { getMe, profileUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser?._id);
    subscribeToMessages();
    return () => {
      unsubscribeFromMessages();
    };
  }, [getMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(messageEndRef, "ref");

  useEffect(() => {
    getMe();
  }, [getMe]);

  if (isMessagesLoading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="w-full px-3  flex flex-col justify-between">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Array.isArray(messages) &&
          messages.map((message) => (
            <div
              key={message?._id}
              className={`chat ${
                message.senderId === profileUser?._id
                  ? "chat-end"
                  : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === profileUser?._id
                        ? profileUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
