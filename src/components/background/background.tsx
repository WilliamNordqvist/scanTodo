import styled from "styled-components";
import Div100vh from "react-div-100vh";

export const Background = styled(Div100vh)`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.color.primaryBackground };
  position: relative;
  * {
    color: ${(props) => props.theme.color.primaryTextColor};
  }
`;
