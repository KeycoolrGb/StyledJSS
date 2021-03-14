import React, { Component } from "react";
import {
  addTaskAction,
  changeThemeAction,
  deleteTaskAction,
  doneTaskAction,
  redoTaskAction,
  editTaskAction,
  updateTaskAction,
} from "../../redux/actions/ToDoListAction";
import { Container } from "../../ComponentToDoList/Container";
import { ThemeProvider } from "styled-components";
import { ToDoListDarkTheme } from "../../theme/ToDoListDarkTheme";
import { ToDoListLightTheme } from "../../theme/ToDoListLightTheme";
import { ToDoListPrimaryTheme } from "../../theme/ToDoListPrimaryTheme";
import { TextField } from "../../ComponentToDoList/TextField";
import { Button } from "../../ComponentToDoList/Button";
import { Dropdown } from "../../ComponentToDoList/Dropdown";
import { Table, Td, Tbody, Th, Thead, Tr } from "../../ComponentToDoList/Table";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
} from "../../ComponentToDoList/Heading";
import { connect } from "react-redux";
import { arrTheme } from "../../theme/managerTheme";
class ToDoList extends Component {
  state = {
    taskName: "",
    disabled: true,
  };
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th style={{ textAlign: "right" }}>
              <Button
                onClick={() => {
                  this.props.dispatch(deleteTaskAction(task.id));
                }}
              >
                <i className="fa fa-trash"></i>
              </Button>
              <Button
                onClick={() => {
                  this.setState(
                    {
                      disabled: false,
                    },
                    () => {
                      this.props.dispatch(editTaskAction(task));
                    }
                  );
                }}
              >
                <i className="fa fa-edit"></i>
              </Button>
              <Button
                onClick={() => {
                  this.props.dispatch(doneTaskAction(task.id));
                }}
              >
                <i className="fa fa-check"></i>
              </Button>
            </Th>
          </Tr>
        );
      });
  };
  renderTaskCompleted = () => {
    return this.props.taskList
      .filter((task) => task.done)
      .map((task, index) => (
        <Tr key={index}>
          <Th>{task.taskName}</Th>
          <Th style={{ textAlign: "right" }}>
            <Button
              onClick={() => {
                this.props.dispatch(deleteTaskAction(task.id));
              }}
            >
              <i className="fa fa-trash"></i>
            </Button>
            <Button
              onClick={() => {
                this.props.dispatch(redoTaskAction(task.id));
              }}
            >
              <i class="fa fa-redo-alt"></i>
            </Button>
          </Th>
        </Tr>
      ));
  };
  // // handleChange = (e) => {
  // //   const { value, name } = e.target;
  // //   this.setState({
  // //     [name]: value,
  // //   });
  // };
  // render Theme
  renderTheme = () => {
    return arrTheme.map((theme, index) => {
      return (
        <option key={index} value={theme.id}>
          {theme.name}
        </option>
      );
    });
  };

  render() {
    return (
      <ThemeProvider theme={this.props.themeToDoList}>
        <Container className="w-50">
          <Dropdown
            onChange={(e) => {
              let { value } = e.target;
              this.props.dispatch(changeThemeAction(value));
            }}
          >
            {this.renderTheme()}
          </Dropdown>
          <Heading3>To Do List</Heading3>
          <TextField
            value={this.state.taskName}
            onChange={(e) => {
              this.setState(
                {
                  taskName: e.target.value,
                },
                () => {
                  console.log(this.state);
                }
              );
            }}
            name="taskName"
            label="Task Name"
            className="w-50"
          ></TextField>
          <Button
            onClick={() => {
              // lấy thông tin người dùng nhập vào từ input
              let { taskName } = this.state;
              //tạo ra một task object
              let newTask = {
                id: Date.now(),
                taskName: taskName,
                done: false,
              };
              //đưa task object lên redux thông qua phương thức dispatch
              this.props.dispatch(addTaskAction(newTask));
            }}
          >
            <i className="fa fa-plus"></i> Add task
          </Button>
          {this.state.disabled ? (
            <Button
              disabled
              onClick={() => {
                this.props.dispatch(updateTaskAction(this.state.taskName));
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          ) : (
            <Button
              onClick={() => {
                let { taskName } = this.state;
                this.setState({ disabled: true, taskName: "" }, () => {
                  this.props.dispatch(updateTaskAction(taskName));
                });
              }}
            >
              <i className="fa fa-upload"></i> Update task
            </Button>
          )}
          <hr />
          <Heading3>Task To Do</Heading3>
          <Table>
            <Thead>{this.renderTaskToDo()}</Thead>
          </Table>
          <Heading3>Task Complete</Heading3>
          <Table>
            <Thead>{this.renderTaskCompleted()}</Thead>
          </Table>
        </Container>
      </ThemeProvider>
    );
  }
  //đây là lifecycle trả về props cũ và state cũ của component trước khi render (lifecycle này chạy sau render)
  componentDidUpdate(prevProps, prevState) {
    //so sánh nếu như props trước đó (taskEdit trước mà khác taskEdit hiện tại thì mình mới setState)
    if (prevProps.taskEdit.id !== this.props.taskEdit.id) {
      this.setState({
        taskName: this.props.taskEdit.taskName,
      });
    }
  }
}

const mapStateToProps = (state) => ({
  themeToDoList: state.toDoListReducer.themeToDoList,
  taskList: state.toDoListReducer.taskList,
  taskEdit: state.toDoListReducer.taskEdit,
});

export default connect(mapStateToProps)(ToDoList);
