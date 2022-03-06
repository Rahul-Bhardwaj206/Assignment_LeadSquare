import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import RootReducer from "./reducers/RootReducer";
import api from "app/middleware/api";

// import backend from "app/middleware/backend";
const initialState = {};



const configureStore = preloadedState => createStore(
  RootReducer,
  preloadedState,
  
    applyMiddleware(thunk, api),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  export default configureStore;
