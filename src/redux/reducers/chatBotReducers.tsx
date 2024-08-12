import { BOT } from '../../constant';
import { SET_IS_OPEN, SET_LOADING, SET_MESSAGES ,SET_USER_ID } from '../actionTypeConstants/chatBotConstant';

interface Message {
  id: number;
  user: string;
  text: string;
}

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  loading: boolean;
  userId:string;
}

// Define the initial state without Immutable
const initialState: ChatState = {
  isOpen: false,
  messages: [{ id: Date.now(), user: BOT, text: 'Hi, How can I help you?' }],
  loading: false,
  userId: "",
};

// Define action types
interface SetIsOpenAction {
  type: typeof SET_IS_OPEN;
  value: boolean;
}

interface SetMessagesAction {
  type: typeof SET_MESSAGES;
  value: Message[];
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  value: boolean;
}

interface SetUserId {
  type: typeof SET_USER_ID;
  value: string;
}

type ChatActions = SetIsOpenAction | SetMessagesAction | SetLoadingAction | SetUserId;

// Reducer function
const chatBotReducer = (state = initialState, action: ChatActions): ChatState => {
  switch (action.type) {
    case SET_IS_OPEN:
      return { ...state, isOpen: action.value };
    case SET_MESSAGES:
      return { ...state, messages: action.value };
    case SET_LOADING:
      return { ...state, loading: action.value };
    case SET_USER_ID:
        return { ...state, userId: action.value };
    default:
      return state;
  }
};

export default chatBotReducer;
