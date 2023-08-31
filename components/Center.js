import React from "react";
import { styled } from "styled-components";

const StyledDiv = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Center = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Center;
