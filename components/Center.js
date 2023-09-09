import React from "react";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  max-width: 90%;
  margin: 0 auto;
  @media screen and (min-width: 800px) {
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
