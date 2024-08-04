import React from "react";
import ChatBot from "../ChatBot";
import "./index.css"
import { ChatBotIcon } from "../../utils/imageProvider";
import { useDispatch , useSelector } from "react-redux";
import { setIsOpen } from "../../redux/actions/chatBotAction";
import { RootState } from "../../redux/store";

const PreApp = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state:RootState) => state.chatBot);
  return (
    <React.Fragment>
    <div className="header__container">
        <div className="header__container_heading">
         <img src="https://www.artisan.co/_next/image?url=%2Fassets%2Fartisan-primary-logo.webp&w=64&q=75" />
         <div>Artisian</div>
        </div>
    </div>
    <ChatBot />
    {!isOpen && <img
        src={ChatBotIcon}
        alt="Chatbot Icon"
        className="chatbot-icon"
        onClick={()=>{dispatch(setIsOpen(true))}}
      />}
    </React.Fragment>
  );
};
export default PreApp;
