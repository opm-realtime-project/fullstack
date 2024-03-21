import Container from "../components/container/container";
import { useEffect, useState } from "react";
import socket from "../socket.js";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.jsx";

function Home() {
  const [users, setUsers] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showContainer, setShowContainer] = useState(false);
  const [target, setTarget] = useState("");
  const [targetMsg, setTargetMsg] = useState({});

  useEffect(() => {
    socket.disconnect();
    socket.auth = {
      username: localStorage.user,
    };

    socket.connect();
  }, []);

  useEffect(() => {
    socket.on("users", (param) => {
      setUsers(param);
    });

    socket.on("private:message", (param) => {
      const { from, to, message } = param;

      let targetUser = localStorage.user === from ? to : from;
      const oldUserMessage = targetMsg[targetUser] ? targetMsg[targetUser] : [];
      oldUserMessage.push({ from, to, message });

      setTargetMsg({
        ...targetMsg,
        [targetUser]: oldUserMessage,
      });
    });

    return () => {
      socket.off("users");
      socket.off("message:info");
      socket.off("private:message");
    };
  }, [targetMsg, target]);

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (target) {
        socket.emit("private:message", {
          from: localStorage.user,
          to: target,
          message: newMessage,
        });
        setNewMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if(showContainer === false) setShowContainer(true)
    if(showContainer === true) setShowContainer(false)
  };

  const handleUserClick = (user) => {
    setTarget(user);
  };

  return (
    <>
      <div className="flex h-screen antialiased text-gray-800 mt-1">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg ">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">OPM Realtime Chat</div>
            </div>
            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-m">
                <span className="font-bold">Online Users</span>
              </div>
              {users.map(
                (user, index) =>
                  localStorage.user !== user && (
                    <div
                      className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto"
                      key={index}>
                      <button
                        onClick={() => handleUserClick(user)}
                        className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                        <div className="flex items-center justify-center h-4 w-4 bg-green-600 rounded-full"></div>
                        <div className="ml-2 text-sm font-semibold">{user}</div>
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
          {target && (
            <div className="flex flex-col flex-auto h-full p-6 w-3/4">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      {(targetMsg[target] ?? []).map((item, index) => {
                        return item.from === localStorage.user ? (
                          <div
                            className="col-start-6 col-end-13 p-3 rounded-lg"
                            key={index}>
                            <div className="flex items-center justify-start flex-row-reverse">
                              <div className="flex items-center justify-center h-7 w-7 bg-yellow-600 rounded-full">
                                {item.from.charAt(0)}
                              </div>
                              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                <div>{item.message}</div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="col-start-1 col-end-8 p-3 rounded-lg"
                            key={index}>
                            <div className="flex flex-row items-center">
                              <div className="flex items-center justify-center h-7 w-7 bg-blue-600 rounded-full">
                                {item.from.charAt(0)}
                              </div>
                              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                <div>{item.message}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div>
                      <button
                        onClick={(e) => handleClick(e)}
                        className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-grow ml-4">
                      <div className="relative w-full">
                        <input
                          type="text"
                          className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                          onChange={(e) => setNewMessage(e.target.value)}
                          value={newMessage}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                        type="submit">
                        <span>Send</span>
                        <span className="ml-2">
                          <svg
                            className="w-4 h-4 transform rotate-45 -mt-px"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {showContainer && <Container className="flex flex-col w-1/4" />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
