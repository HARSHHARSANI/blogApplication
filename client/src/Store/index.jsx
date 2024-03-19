import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Import redux-thunk for handling async actions
import rootReducer from "./reducers"; // Import your combined reducers
import { composeWithDevTools } from "redux-devtools-extension"; // Import composeWithDevTools from redux-devtools-extension

const middleware = [thunk];
const enhancers = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, enhancers);

export default store;
