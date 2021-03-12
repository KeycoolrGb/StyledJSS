import React, { Component } from "react";
import {
  addTaskAction,
  changeThemeAction,
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
  };
  renderTaskToDo = () => {
    return this.props.taskList
      .filter((task) => !task.done)
      .map((task, index) => {
        return (
          <Tr key={index}>
            <Th>{task.taskName}</Th>
            <Th style={{ textAlign: "right" }}>
              <Button>
                <i className="fa fa-trash"></i>
              </Button>
              <Button>
                <i className="fa fa-edit"></i>
              </Button>
              <Button>
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
            <Button>
              <i className="fa fa-trash"></i>
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
          <Button>
            <i className="fa fa-upload"></i> Update task
          </Button>
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
}

const mapStateToProps = (state) => ({
  themeToDoList: state.toDoListReducer.themeToDoList,
  taskList: state.toDoListReducer.taskList,
});

export default connect(mapStateToProps)(ToDoList);
