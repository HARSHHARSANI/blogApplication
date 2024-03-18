import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // If you need to handle async actions
import rootReducer from "./reducers"; // Create reducers in the 'reducers' folder

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
