import styled, { css } from "styled-components";

export default styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
        
    ${(props) =>
    props.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 700;
      text-align: center;
    `}
  


  line-height : 1.4;
  margin: 2rem 0 0 0;
`;
