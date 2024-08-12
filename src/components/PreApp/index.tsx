import React, { useEffect, useState } from "react";
import ChatBot from "../ChatBot";
import { ChatBotIcon } from "../../utils/imageProvider";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen, setUserId } from "../../redux/actions/chatBotAction";
import { RootState } from "../../redux/store";
import { ARTISAN_LOGO, ARTISAN_TEXT, CHATBOT_ACTIVATED, EMAIL_INVALID } from "../../constant";
import { createUser } from "../../utils/api";
import { toast } from 'react-toastify';
import "./index.css";

const PreApp = () => {
  const dispatch = useDispatch();
  const { isOpen , userId } = useSelector((state: RootState) => state.chatBot);
  const [showNotification, setShowNotification] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  useEffect(()=>{
    if(userId.length > 0){
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  },[userId])

  const checkUser = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailValue)) {
      dispatch(setUserId(""));
      setEmailValue("")
      toast.error(EMAIL_INVALID, {
        autoClose: 2000,
      });
      return; 
    }
    try {
      const { data } = await createUser(emailValue);
      dispatch(setUserId(data?.user_id));
      toast.success(CHATBOT_ACTIVATED, {
        autoClose: 2000,
      });
    } catch (error) {
      dispatch(setUserId(""));
      setEmailValue("")
      toast.error(EMAIL_INVALID, {
        autoClose: 2000,
      });
    }
  };
  
  return (
    <React.Fragment>
      <div className="header__container">
        <div className="header__container_heading">
          <a>
            <img
              src={ARTISAN_LOGO}
              className="artisan_logo"
            />
            <img
              src={ARTISAN_TEXT}
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
      {userId?.length<=0 && <div className="email_input">
            <input type="text" 
            placeholder="Please enter a valid email to enable the chatbot......" 
            value={emailValue} 
            onChange={(e)=>{
              setEmailValue(e.target.value)
            }}
           onKeyDown={(e)=>{ 
            if(e.keyCode === 13)
            checkUser()
            }}
            />
            <input type="button" value={"Submit"} onClick={()=>{checkUser()}} />
        </div> }
      </div>
      <ChatBot />
      {!isOpen && userId.length>0 && (
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
