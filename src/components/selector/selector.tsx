import React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";

type TSelect = {
  items: number[] | string[];
  placeholder?: string;
  onChange: (event: SelectChangeEvent<any>) => void;
  value:any;
};

const StyledSelect = styled(Select)`
  && {
    border: 1px solid;
    color: ${({ theme }) => theme.color.selectorColor};
    width:90%;

    svg {
      fill: ${({ theme }) => theme.color.selectorColor};
    }
  }
`;

const Placeholder = styled(InputLabel)`
  background:${({ theme }) => theme.color.secondaryBackground};;
  && {
    color: ${({ theme }) => theme.color.selectorTextColor};
    padding: 0 10px;
  }
`;

export const Selector: React.VFC<TSelect> = ({
  items,
  placeholder,
  onChange,
  value,
}) => {

  return (
    <FormControl size="small" focused={false} fullWidth>
      {placeholder && <Placeholder>{placeholder}</Placeholder>}
      <StyledSelect
        value={value}
        label={placeholder}
        fullWidth
        onChange={onChange}
      >
        {items.map((item) => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </StyledSelect>
    </FormControl>
  );
};
