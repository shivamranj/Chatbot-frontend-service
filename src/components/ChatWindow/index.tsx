import React, { useEffect, useRef, useState } from "react";
import { ARTISAN_URL, BOT ,ARTISAN_URL_PRODUCT, ARTISAN_DASHBOARD, ARTISAN_PRODUCT_PAGE, ERROR_MESSAGE } from "../../constant";
import { setLoading, setMessages } from "../../redux/actions/chatBotAction";
import { showHistory } from "../../utils/api";
import { formatMessage } from "../../utils/helper";
import { profileIcon } from "../../utils/imageProvider";
import { useDispatch, UseDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import "./index.css";

interface ChatWindowProps {
  messages: { id: number; user: string; text: string; edited?: boolean }[];
  onDeleteMessage: (messageId: number) => void;
  onEditMessage: (messageId: number, newText: string) => void; // Added onEditMessage prop
}

interface Message {
  id: number;
  user: string;
  text: string;
  edited?: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  onDeleteMessage,
  onEditMessage,
}) => {
  const { userId } = useSelector((state: RootState) => state.chatBot);
  const [hoveredMessageId, setHoveredMessageId] = useState<number | null>(null);
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const [editMessageId, setEditMessageId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const endViewRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    endViewRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMouseEnter = (messageId: number) => {
    setHoveredMessageId(messageId);
  };

  const handleMouseLeave = () => {
    setHoveredMessageId(null);
    setShowOptions(null); 
  };

  const toggleOptions = (messageId: number) => {
    setShowOptions((prevId) => (prevId === messageId ? null : messageId));
  };

  const handleSaveEdit = (editMessageId: number, editText: string) => {
    onEditMessage(editMessageId, editText);
    setEditMessageId(null);
    setEditText("");
  };

  const getHistory = async ()=>{
    try {
      const reply = await showHistory(userId);
      if(Array.isArray(reply)){
        dispatch(setMessages([...reply]));
      }else{
        const errorMessage: Message = {
          id: Date.now(),
          user: BOT,
          text: reply?.detail || ERROR_MESSAGE,
        };
        dispatch(setMessages([...messages, errorMessage]));
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: Date.now(),
        user: BOT,
        text: ERROR_MESSAGE,
      };
      dispatch(setMessages([...messages, errorMessage]));
      dispatch(setLoading(false));
    }
  }

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
            <a className="message-content_cyclic" onClick={()=>{
              getHistory()
            }} target="_blank">{ARTISAN_PRODUCT_PAGE}</a>
            </>
          )}
        </>
      ))}
      <div ref={endViewRef} />
    </div>
  );
};

export default ChatWindow;
