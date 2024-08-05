import React, { useEffect, useState } from "react";
import ChatBot from "../ChatBot";
import "./index.css";
import { ChatBotIcon } from "../../utils/imageProvider";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../redux/actions/chatBotAction";
import { RootState } from "../../redux/store";

const PreApp = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.chatBot);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <React.Fragment>
      <div className="header__container">
        <div className="header__container_heading">
          <a>
            <img
              src="https://www.artisan.co/_next/image?url=%2Fassets%2Fartisan-primary-logo.webp&w=64&q=75"
              className="artisan_logo"
            />
            <img
              src="https://www.artisan.co/_next/image?url=%2Fassets%2Fartisan-text-logo.webp&w=256&q=75"
              className="artisan_text"
            />
          </a>
        </div>
      </div>
      <div className="body__content">
        <div className="body__content_info">
          <h1>Automate Your Outbound With an All-In-One, AI-First Platform</h1>
          <h2>Powered by AI Employees</h2>
        </div>
        <div className="marquee">
          <div className="body__content_message">
            Welcome To Ava ChatBot......
          </div>
        </div>
      </div>
      <ChatBot />
      {!isOpen && (
        <>
          <img
            src={ChatBotIcon}
            alt="Chatbot Icon"
            className="chatbot-icon"
            onClick={() => {
              setShowNotification(false);
              dispatch(setIsOpen(true));
            }}
          />
          {showNotification && (
            <div className="chatbot-notification">
              Please click on the icon to talk to our Ava agent.
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
};
export default PreApp;
