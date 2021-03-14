import { ToDoListDarkTheme } from "../../theme/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../theme/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../theme/ToDoListPrimaryTheme";
import {
  ADD_TASK,
  CHANGE_THEME,
  DELETE_TASK,
  DONE_TASK,
  REDO_TASK,
  EDIT_TASK,
  UPDATE_TASK,
} from "../types/ToDoListType";
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
  taskEdit: { id: "task-1", taskName: "task 1", done: true },
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
    case DONE_TASK: {
      // CLick vào button check => dispatch lên action có taskId
      let taskListUpdate = [...state.taskList];
      /*  từ taskId tìm ra task đó ở vị trí nào trong mảng tiến hành cập nhật lại thuộc tính done = true. 
      Và cập nhật state của redux */

      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
      if (index !== -1) {
        taskListUpdate[index].done = true;
      }

      // state.taskList = taskListUpdate;
      return { ...state, taskList: taskListUpdate };
    }
    case DELETE_TASK: {
      let taskListUpdate = [...state.taskList];
      /* Cách 1 */
      // let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
      // if (index !== -1) {
      //   taskListUpdate.splice(index, 1);
      // }
      /* Cách 2 */
      /* Gán lại giá trị cho mảng taskListUpdate = chính nó nhưng filter không có taskId đó */
      // taskListUpdate = taskListUpdate.filter(
      //   (task) => task.id !== action.taskId
      // );

      // return { ...state, taskList: taskListUpdate };

      /* Cách 3 */
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.taskId),
      };
    }
    case REDO_TASK: {
      let taskListUpdate = [...state.taskList];

      let index = taskListUpdate.findIndex((task) => task.id === action.taskId);
      if (index !== -1) {
        taskListUpdate[index].done = false;
      }

      return { ...state, taskList: taskListUpdate };
    }
    case EDIT_TASK: {
      return { ...state, taskEdit: action.task };
    }
    case UPDATE_TASK: {
      // chỉnh sửa lại taskName của taskEdit
      state.taskEdit = { ...state.taskEdit, taskName: action.taskName };

      // tìm trong taskList cập nhật lại taskEdit người dùng update
      let taskListUpdate = [...state.taskList];
      let index = taskListUpdate.findIndex(
        (task) => task.id === state.taskEdit.id
      );
      if (index !== -1) {
        taskListUpdate[index] = state.taskEdit;
      }
      state.taskList = taskListUpdate;
      state.taskEdit = { id: "-1", taskName: "", done: false };

      return { ...state };
    }
    default:
      return { ...state };
  }
};

export default toDoListReducer;
