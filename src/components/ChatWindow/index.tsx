import React, { useEffect, useRef, useState } from "react";
import { ARTISAN_URL, BOT ,ARTISAN_URL_PRODUCT, ARTISAN_DASHBOARD, ARTISAN_PRODUCT_PAGE } from "../../constant";
import { formatMessage } from "../../utils/helper";
import { profileIcon } from "../../utils/imageProvider";
import "./index.css";

interface ChatWindowProps {
  messages: { id: number; user: string; text: string; edited?: boolean }[];
  onDeleteMessage: (messageId: number) => void;
  onEditMessage: (messageId: number, newText: string) => void; // Added onEditMessage prop
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onDeleteMessage,
  onEditMessage,
}) => {
  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const [editMessageId, setEditMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const endViewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endViewRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMouseEnter = (messageId: number) => {
    setHoveredMessageId(messageId);
  };

  const handleMouseLeave = () => {
    setHoveredMessageId(null);
    setShowOptions(null); // Hide options when the mouse leaves the message
  };

  const toggleOptions = (messageId: number) => {
    setShowOptions((prevId) => (prevId === messageId ? null : messageId));
  };

  const handleSaveEdit = (editMessageId: number, editText: string) => {
    onEditMessage(editMessageId, editText);
    setEditMessageId(null);
    setEditText("");
  };

  return (
    <div className="chat-window">
      {messages.map((msg, index) => (
        <>
          <div
            key={index}
            className={`message ${msg.user.toLowerCase()}`}
            onMouseEnter={() => handleMouseEnter(msg.id)}
            onMouseLeave={handleMouseLeave}
          >
            {msg.user === BOT && (
              <img className="bot-icon" src={profileIcon} />
            )}
            <div className="message-content">
              <div>
                {formatMessage(msg.text)} 
                {/* {msg.text} */}
                {msg.edited && <span className="edited-label"> (edited)</span>}
                {msg.user === "User" && hoveredMessageId === msg.id && (
                  <div className="message-options">
                    <span
                      className="ellipsis"
                      onClick={() => toggleOptions(msg.id)}
                    >
                      ...
                    </span>
                    {showOptions === msg.id && (
                      <div className="options-menu">
                        <button
                          onClick={() => handleSaveEdit(msg.id, msg.text)}
                        >
                          Edit
                        </button>
                        <button onClick={() => onDeleteMessage(msg.id)}>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          {msg.user === BOT && index==0 && (
            <>
            <a className="message-content_cyclic" href={ARTISAN_URL} target="_blank">{ARTISAN_DASHBOARD}</a>
            <a className="message-content_cyclic" href={ARTISAN_URL_PRODUCT} target="_blank">{ARTISAN_PRODUCT_PAGE}</a>
            </>
          )}
        </>
      ))}
      <div ref={endViewRef} />
    </div>
  );
};

export default ChatWindow;
