import { combineReducers } from "redux";
import { plantReducer } from "./plant";

export const reducers = combineReducers({
    plant: plantReducer 
})