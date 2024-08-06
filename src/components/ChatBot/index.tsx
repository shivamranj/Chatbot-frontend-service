import React, { useEffect, useState } from "react";
import ChatWindow from "../ChatWindow";
import ChatInput from "../ChatInput";
import { Collapse, CrossIcon, Expand, profileIcon } from "../../utils/imageProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  setMessages,
  setLoading,
  setIsOpen,
} from "../../redux/actions/chatBotAction";
import { RootState } from "../../redux/store";
import "./index.css";
import { sendChatMessage } from "../../utils/api";
import { BOT, ERROR_MESSAGE } from "../../constant";

interface Message {
  id: number;
  user: string;
  text: string;
  edited?: boolean;
}

const ChatBot: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, isOpen, loading } = useSelector(
    (state: RootState) => state.chatBot
  );
  const [isMaximized, setIsMaximized] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (isOpen && messages.length <=1) {
      dispatch(
        setMessages([
          { id: Date.now(), user: BOT, text: "Hi, How can I help you?" },
        ])
      );
    }
  }, [isOpen]);

  const handleSendMessage = async (message: string) => {
    if (editingMessage) {
      const updatedMessages = messages.map((msg) =>
        msg.id === editingMessage.id ? { ...msg, text: message ,edited: true  } : msg
      );
      dispatch(setMessages(updatedMessages));
      setEditingMessage(null); // Clear the editing state
    } else {
      const userMessage: Message = {
        id: Date.now(),
        user: "User",
        text: message,
      };
      const updatedMessages = [...messages, userMessage];

      dispatch(setMessages(updatedMessages));
      dispatch(setLoading(true));

      try {
        const reply = await sendChatMessage(message);
        const botMessage: Message = {
          id: Date.now(),
          user: BOT,
          text: reply,
        };
        dispatch(setMessages([...updatedMessages, botMessage]));
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error sending message:", error);
        const errorMessage: Message = {
          id: Date.now(),
          user: BOT,
          text: ERROR_MESSAGE,
        };
        dispatch(setMessages([...updatedMessages, errorMessage]));
        dispatch(setLoading(false));
      }
    }
  };

  const handleDeleteMessage = (messageId: number) => {
    const updatedMessages = messages.filter((msg) => msg.id !== messageId);
    dispatch(setMessages(updatedMessages));
  };

  const handleEditMessage = (messageId: number) => {
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (messageToEdit) {
      setEditingMessage(messageToEdit);
    }
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      className={`chatbot ${isOpen ? "open" : ""}${
        isMaximized ? " maximized" : ""
      }`}
    >
      <div className="chatbot-header">
        <img
          src={isMaximized ? Collapse : Expand}
          className={`fullscreen-icon ${isMaximized ? "collapse" : "expand"}`}
          onClick={() => {
            toggleMaximize();
          }}
        />
        <img
          className="close-btn"
          onClick={() => dispatch(setIsOpen(false))}
          src = {CrossIcon}
        />
        <div className="chatbot-header__details">
          <img src={profileIcon} />
          <div>Hey 👋, I'm Ava</div>
          <div className="chatbot-header__details_info">
            Ask me anything or pick a place to start
          </div>
        </div>
      </div>
      <div className="chatbot-body">
        <ChatWindow
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
          onEditMessage={handleEditMessage} // Pass the editing function to ChatWindow
        />
        <div className="loading-container">
          {loading && (
            <div className="loading-dots">
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
              <div className="loading-dot"></div>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="chatbot-footer">
          <hr className="footer-line" />
          <ChatInput
            onSend={handleSendMessage}
            editingMessage={editingMessage}
          />
        </div>
      )}
    </div>
  );
};

export default ChatBot;
