import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
// bỏ cái này qua file riêng
const configLigthTheme = {
  color: "blue",
  backgroundColor: "yellow",
  fontSize: "25px",
  fontWeight: "Bold",
};
const configDarkTheme = {
  color: "white",
  backgroundColor: "black",
  fontSize: "25px",
  fontWeight: "Bold",
};
function DemoTheme() {
  const [state, setstate] = useState({ currentTheme: configLigthTheme });

  const Container = styled.div`
    padding: 5%;
    color: ${(props) => props.theme.color};
    background-color: ${(props) => props.theme.backgroundColor};
    font-size: ${(props) => props.theme.fontSize};
    font-weight: ${(props) => props.theme.fontWeight};
  `;
  const handleChange = (e) => {
    setstate({
      currentTheme: e.target.value == "1" ? configLigthTheme : configDarkTheme,
    });
  };
  return (
    <ThemeProvider theme={state.currentTheme}>
      <Container>123</Container>
      <select onChange={handleChange}>
        <option value="1">Light Theme</option>
        <option value="2">Dark Theme</option>
      </select>
    </ThemeProvider>
  );
}

export default DemoTheme;
