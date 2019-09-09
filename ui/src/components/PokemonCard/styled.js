import React from "react";
import styled, { css } from "styled-components";
import {
  Card as MuiCard,
  CardContent as MuiCardContent
} from "@material-ui/core";

export const Card = styled(({ isSmall, animateHovering, ...props }) => (
  <MuiCard {...props} />
))`
  && {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 300px;
    height: 400px;
    transition-property: transform, box-shadow;
    transition-duration: 300ms;
    transform: scale(1);
    background-color: ${props => props.theme.lightBlue};

    ${props =>
      props.animateHovering &&
      css`
        :hover {
          transform: scale(1.055);
          box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
            0px 2px 2px 0px rgba(0, 0, 0, 0.14),
            0px 3px 1px -2px rgba(0, 0, 0, 0.12);
        }
      `};

    ${props =>
      props.isSmall &&
      css`
        width: 165px;
        height: 220px;
      `};
  }
`;

export const Img = styled.img`
  width: 150px;
  height: 150px;

  ${props =>
    props.isSmall &&
    css`
      width: 75px;
      height: 75px;
    `};
`;

export const CardContent = styled(({ isSmall, ...props }) => (
  <MuiCardContent {...props} />
))`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    width: 100%;
    box-sizing: border-box;

    ${props =>
      props.isSmall &&
      css`
        padding: 0.5rem 0.5rem 0.66rem 0.5rem;
      `}
  }
`;

export const Text = styled.p`
  margin-top: 0;
  margin-bottom: 0.5rem;

  ${props =>
    props.isSmall &&
    css`
      font-size: 0.66rem;
    `}
`;
