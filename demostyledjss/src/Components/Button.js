import styled from "styled-components";

export const Button = styled.button`
  color: red;
  background: ${(props) =>
    props.bgPrimary ? "linear-gradient(red, blue, green)" : "blue"};
  outline: none;
  border: ${(props) => (props.border ? "none" : "1px solid red")};
  opacity: 1;
  &:hover {
    color: white;
    background-color: red;
    transition: all 0.5s;
  }
  &.button_style {
    font-size: 25px;
  }
`;

//Extending Styles - kế thừa css từ thằng cha
export const TomatoButton = styled(Button)`
  background-color: pink;
`;
