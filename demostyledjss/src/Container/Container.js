import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    padding-right:15px;
    padding-left:15px;
margin-right-auto;
margin-left-auto;
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.color};
  font-size: ${(props) => props.theme.fontSize};
  font-weight: ${(props) => props.theme.fontWeight};
`;
