import React, { useState } from "react";
import {
  FormControl,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  Input
} from "@material-ui/core";

import * as S from "./styled";

export default function SearchBox({ title, children }) {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  };
  const [selectedTypes, setSelectedTypes] = useState([]);
  const types = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Bug",
    "Rock",
    "Ghost",
    "Ice",
    "Steel",
    "Flying",
    "Fighting",
    "Poison",
    "Psychic",
    "Electric",
    "Ground",
    "Dragon"
  ];

  function handleSelectType(event) {
    const newSelectedTypes = event.target.value;
    setSelectedTypes(newSelectedTypes);
  }

  return (
    <div>
      <S.FormControl>
        <InputLabel>{title}</InputLabel>
        <S.Select
          multiple
          value={selectedTypes}
          onChange={handleSelectType}
          input={<Input />}
          renderValue={() => (
            //classes.chips
            <div>
              {selectedTypes.map((type, i) => (
                //style chip
                <Chip key={i} label={type} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {types.map((type, i) => (
            <MenuItem key={i} value={type}>
              {type}
            </MenuItem>
          ))}
        </S.Select>
      </S.FormControl>
      {children(selectedTypes)}
    </div>
  );
}
