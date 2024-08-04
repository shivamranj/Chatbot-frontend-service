import React, { useState, useEffect } from "react";
import {
  sendMsgButton,
  setting,
  userProfileIcon,
} from "../../utils/imageProvider";
import "./index.css";

interface ChatInputProps {
  onSend: (message: string) => void;
  editingMessage: { id: number; text: string } | null;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, editingMessage }) => {
  const [message, setMessage] = useState("");

  // Pre-fill the input with the message text when editing
  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.text);
    }
  }, [editingMessage]);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <div className="chat-input-container">
      <img src={userProfileIcon} alt="Profile" className="profile-image" />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type Something..."
      />
      <img src={setting} alt="setting" className="setting" />
      <img
        src={sendMsgButton}
        alt="send msg"
        className="send-msg-button"
        onClick={handleSend}
      />
    </div>
  );
};

export default ChatInput;
