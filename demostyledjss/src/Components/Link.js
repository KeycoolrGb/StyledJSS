import React, { Component } from "react";
import styled from "styled-components";

// export const Link = (props) => {
//   return <p className={props.className}>{props.children}</p>;
// };
// let {className, children} = props - bóc tách phần tử

//Styling any component
export const Link = ({ children, className, ...restProps }) => {
  return (
    <a className={className} {...restProps}>
      {children}
    </a>
  );
};

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  font-weight: bold;
  background-color: black;
  cursor: pointer;
`;
