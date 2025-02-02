import React, { useState, useEffect, useRef } from 'react'
import { io } from "socket.io-client";
import "./livechat.css"

const Livechat = () => {
    const socketIoServer = io(`${import.meta.env.VITE_REACT_BACKEND_URL}`);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState("");
    const [socket, setsocket] = useState(socketIoServer)

    const sendMessage = (e) => {
        e.preventDefault();
        const newMessage = { user: "You", text: chatMessage };
        let userName = localStorage.getItem("username");
        socket.emit("sending-message", { chatMessage, userName }, (response) => {
            console.log(userName);
            console.log("Message sent: " + chatMessage);
            console.log("Server response: " + response);
        });

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setChatMessage("");
    };


    return (
        <div id='livechat'>
            <div className="live-chat-container">
                <div
                    className={`chat-toggle ${isChatOpen ? "hidden" : ""}  `}
                    onClick={() => setIsChatOpen(!isChatOpen)}
                >
                    💬
                </div>
                {isChatOpen && (
                    <div className="chat-box">
                        <div className="chat-header">
                            <span className="font-bold text-2xl text-black">Live Chat</span>
                            <button
                                className="bg-black rounded p-2 cursor-pointer"
                                onClick={() => setIsChatOpen(false)}
                            >
                                ❌
                            </button>
                        </div>
                        <div className="chat-body">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className="chat-message"
                                    style={{
                                        backgroundColor:
                                            msg.user == "You" ? "#DCF8C6" : "#EDEDED",
                                    }}
                                >
                                    <strong>{msg.user}:</strong> {msg.text}
                                </div>
                            ))}
                        </div>
                        <form className="chat-input" onSubmit={sendMessage}>
                            <input
                                type="text"
                                value={chatMessage}
                                onChange={(e) => setChatMessage(e.target.value)}
                                placeholder="Type a message..."
                                required
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Livechat