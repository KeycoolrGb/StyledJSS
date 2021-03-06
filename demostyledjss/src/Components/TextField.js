import styled from "styled-components";

//STYLED COMPONENT STYLING PROPS SCSS
export const Input = styled.input`
  color: ${(props) => props.inputColor || "red"};
`;
