import { createStore, applyMiddleware } from "redux";
import callAPI from "./_callAPI";
import reducers from "./_reducers";

export default createStore(reducers, applyMiddleware(callAPI));
