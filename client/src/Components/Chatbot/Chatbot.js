import React, { useState } from "react";
import { BsChatDots, BsX } from "react-icons/bs";
import axios from "axios";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [isChatbotVisible, setChatbotVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: "chatbot",
      message: "Hi there! How can I assist you today?",
    },
  ]);

  const inputInitHeight = 55; 

  const createChatLi = (message, role) => {
    return {
      role: role,
      message: message,
    };
  };

  const generateResponse = async () => {
    const trimmedMessage = userMessage.trim().toLowerCase();

    try {
      const response = await axios.post("http://localhost:4000/app/v1/answer", {
        question: trimmedMessage,
      });

      const answer = await response.data.answer;

      setChatMessages((prevMessages) => [
        ...prevMessages,
        createChatLi(trimmedMessage, "client"),
        createChatLi(answer, "chatbot"),
      ]);

      setUserMessage("");
    } catch (error) {
      console.error("Error fetching response from the API:", error);
    }
  };

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);

    e.target.style.height = `${inputInitHeight}px`;
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const toggleChatbotVisibility = () => {
    setChatbotVisible(!isChatbotVisible);
  };

  return (
    <div>
      {isChatbotVisible && (
        <div className=" fixed gap-6 right-[40px] bottom-[100px] w-[380px] overflow-hidden bg-white rounded-2xl shadow-2xl z-50">
          <header className="bg-[#0077b6] p-5 text-center">
            <h2 className="text-white font-bold text-2xl">Chatbot</h2>
          </header>
          <ul className=" h-[310px] p-4 overflow-y-auto flex flex-col pb-16">
            {chatMessages.map((message, index) => (
              <li
                key={index}
                className={`chat flex mb-2 ${
                  message.role === "client" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 max-w-[75%] ${
                    message.role === "client"
                      ? "rounded-lg bg-[#41b0ec] text-white text-left"
                      : "rounded-lg bg-white text-black text-left"
                  } text-sm shadow-md`}
                >
                  {message.message}
                </div>
              </li>
            ))}
          </ul>

          <div className="absolute bottom-0 w-full bg-white border-t-2 border-gray-500 border-solid flex items-center">
            <textarea
              className="w-[93%] border-none outline-none text-sm resize-none p-2 pt-3 required: flex justify-center items-center"
              placeholder="Enter a message..."
              spellCheck="false"
              required
              onChange={handleUserMessageChange}
              value={userMessage}
            ></textarea>
            <span
              id="send-btn"
              className="material-symbols-rounded cursor-pointer text-[#0077b6]"
              onClick={generateResponse}
            >
              send
            </span>
          </div>
        </div>
      )}
      <div
        className="flex justify-center items-center fixed right-[40px] bottom-[40px] h-12 w-12 rounded-[50%] border-none outline-none cursor-pointer text-white bg-[#0077b6]"
        onClick={toggleChatbotVisibility}
      >
        <span
          className={`absolute text-center rounded-lg flex justify-center items-center ${
            isChatbotVisible ? "opacity-0" : "opacity-1"
          }`}
        >
          <BsChatDots size={34} />
        </span>
        <span
          className={`text-center rounded-lg flex justify-center items-center ${
            isChatbotVisible ? "opacity-1" : "opacity-0"
          }`}
        >
          <BsX size={34} />
        </span>
      </div>
    </div>
  );
};

export default Chatbot;
