//ChatContainer.js
import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import UserLogin from "./UserLogin";
import ChatBoxReciever, { ChatBoxSender } from "./ChatBox";
import InputText from "./InputText";

export default function ChatContainer() {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  const [avatar, setAvatar] = useState(localStorage.getItem("avatar") || "");

  useEffect(() => {
    const newSocket = socketIOClient("http://localhost:5001");
    setSocket(newSocket);

    newSocket.on("chat", (senderChats) => {
      setChats(senderChats);
    });

    return () => newSocket.disconnect(); // Cleanup on unmount
  }, []);

  function sendChatToSocket(chat) {
    socket.emit("chat", chat);
  }

  function addMessage(chat) {
    const newChat = { ...chat, user, avatar };
    setChats([...chats, newChat]);
    sendChatToSocket(newChat);
  }

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
  }

  function ChatList() {
    return chats.map((chat, index) => {
      if (chat.user === user) return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
      return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} />;
    });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {user ? (
        <div>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", padding: "10px" }}>
            <h4>Username: {user}</h4>
            <p onClick={logout} style={{ color: "blue", cursor: "pointer" }}>
              Log Out
            </p>
          </div>
          <ChatList />
          <InputText addMessage={addMessage} />
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
}
