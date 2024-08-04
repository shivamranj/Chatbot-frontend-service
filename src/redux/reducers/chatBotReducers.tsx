import { SET_IS_OPEN, SET_LOADING, SET_MESSAGES } from '../actionTypeConstants/chatBotConstant';

interface Message {
  id: number;
  user: string;
  text: string;
}

interface ChatState {
  isOpen: boolean;
  messages: Message[];
  loading: boolean;
}

// Define the initial state without Immutable
const initialState: ChatState = {
  isOpen: false,
  messages: [{ id: Date.now(), user: 'Bot', text: 'Hi, How can I help you?' }],
  loading: false,
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

type ChatActions = SetIsOpenAction | SetMessagesAction | SetLoadingAction;

// Reducer function
const chatBotReducer = (state = initialState, action: ChatActions): ChatState => {
  switch (action.type) {
    case SET_IS_OPEN:
      return { ...state, isOpen: action.value };
    case SET_MESSAGES:
      return { ...state, messages: action.value };
    case SET_LOADING:
      return { ...state, loading: action.value };
    default:
      return state;
  }
};

export default chatBotReducer;
