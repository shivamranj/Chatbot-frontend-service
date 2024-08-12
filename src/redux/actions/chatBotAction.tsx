import { SET_LOADING , SET_IS_OPEN , SET_MESSAGES, SET_USER_ID } from "../actionTypeConstants/chatBotConstant";

interface Message {
    id: number;
    user: string;
    text: string;
    edited?: boolean;
  }

export const setLoading = (value:boolean) => {
    const action = {
      type: SET_LOADING,
      value,
    };
    return action;
  };

export const setMessages = (messages:Message[])  => {
    const action = {
      type: SET_MESSAGES,
      value:messages,
    };
    return action;
  };

export const setIsOpen = (value:boolean) => {
    const action = {
      type: SET_IS_OPEN,
      value,
    };
    return action;
  };

export const setUserId = (value:string) => {
    const action = {
      type: SET_USER_ID,
      value,
    };
    return action;
  };