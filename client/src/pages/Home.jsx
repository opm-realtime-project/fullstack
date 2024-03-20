import Container from "../components/container/container";
import { useEffect, useState } from "react";
import socket from "../socket.js";

function Home() {
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.disconnect();
    socket.auth = {
      username: localStorage.username,
    };

    socket.connect();
  });

  return (
    <>
      <div>
        <Container />
      </div>
    </>
  );
}

export default Home;
