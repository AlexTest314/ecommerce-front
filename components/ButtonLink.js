import Link from "next/link";
import React from "react";
import { styled } from "styled-components";
import { ButtonStyle } from "./Button";

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

const ButtonLink = (props) => {
  return <StyledLink {...props}></StyledLink>;
};

export default ButtonLink;
