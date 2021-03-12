import { combineReducers } from "redux";
import toDoListReducer from "../Reducer/ToDoListReducer";
const rootReducer = combineReducers({
  toDoListReducer,
});

export default rootReducer;
