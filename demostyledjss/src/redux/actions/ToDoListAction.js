import { ADD_TASK, CHANGE_THEME } from "../../redux/types/ToDoListType";
export const addTaskAction = (newTask) => ({
  type: ADD_TASK,
  newTask,
});

export const changeThemeAction = (themeId) => ({
  type: CHANGE_THEME,
  themeId,
});
