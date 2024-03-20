import { useState } from "react";
import Container from "../components/container/container";
import socket from "../socket";
function Home() {
   const [board, setBoard] = useState([])
   
  return (
    <>
      <div>
        <Container/>
      </div>
    </>
  );
}

export default Home;
