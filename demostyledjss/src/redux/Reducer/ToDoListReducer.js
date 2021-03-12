import { ToDoListDarkTheme } from "../../theme/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../theme/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../theme/ToDoListPrimaryTheme";
import { ADD_TASK, CHANGE_THEME } from "../types/ToDoListType";
import { arrTheme } from "../../theme/managerTheme";

const initialState = {
  themeToDoList: ToDoListDarkTheme,
  taskList: [
    { id: "task-1", taskName: "task 1", done: true },
    { id: "task-2", taskName: "task 2", done: true },
    { id: "task-3", taskName: "task 3", done: false },
    { id: "task-4", taskName: "task 4", done: false },
    { id: "task-5", taskName: "task 5", done: true },
  ],
};

const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK: {
      console.log("todo", action.newTask);

      //kiểm tra rỗng
      if (action.newTask.taskName.trim() === "") {
        alert("Task Name is Required");
        return { ...state };
      }
      // Kiểm tra tồn tại
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.taskName === action.newTask.taskName
      );
      if (index !== -1) {
        alert("Task name is exist");
        return { ...state };
      }
      // taskListUpdate.push(action.newTask);

      // Xử lý xong thì gán taskList mới vào taskList
      // state.taskList = taskListUpdate;
      state.taskList = [...taskListUpdate, action.newTask];
      return { ...state };
    }
    case CHANGE_THEME: {
      // tìm ra theme dựa vào action.themeId được chọn
      let theme = arrTheme.find((theme) => theme.id == action.themeId);
      if (theme) {
        // set lại theme cho state.themeToDoList
        state.themeToDoList = theme.theme;
      }
      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default toDoListReducer;
