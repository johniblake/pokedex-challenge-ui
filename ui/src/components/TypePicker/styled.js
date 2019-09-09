import styled from "styled-components";
import React from "react";

import {
  FormControl as MuiFormControl,
  Select as MuiSelect
} from "@material-ui/core";

export const Select = styled(({ ...props }) => <MuiSelect {...props} />)`
  && {
    font-family: ${props => props.theme.fontFamily};
    .MuiSelect-select {
      &:focus {
        background: none;
      }
    }
    .MuiListItem-root {
      background-color: #e8f0ff;
    }
    .MuiChip-root {
      background-color: #e8f0ff;
      font-family: ${props => props.theme.fontFamily};
    }
  }
`;

export const FormControl = styled(({ ...props }) => (
  <MuiFormControl {...props} />
))`
  && {
    width: 500px;
    margin: 0 10rem;
    .MuiFormLabel-root {
      font-family: ${props => props.theme.fontFamily};
    }
  }
`;
