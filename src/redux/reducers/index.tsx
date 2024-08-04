import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
//import { history } from '../store'; // Adjust the path as necessary
import chatBotReducer from './chatBotReducers'; // Adjust the path as necessary

const rootReducer = combineReducers({
  chatBot: chatBotReducer,
  //router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
