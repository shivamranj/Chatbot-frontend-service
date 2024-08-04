import { legacy_createStore as createStore, applyMiddleware, compose ,Middleware , Store} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import rootReducer from "./reducers";
import createDebounce from "redux-debounced";
import createSagaMiddleware from "redux-saga";
import sagas from "./sagas";


export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const middleware = [
  routerMiddleware(history),
  createDebounce() as Middleware, // Cast type to Middleware
  sagaMiddleware,
];

const composedEnhancers = compose(applyMiddleware(...middleware));

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof rootReducer>; 

