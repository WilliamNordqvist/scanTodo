import React from "react";
import { Link } from "react-router-dom";
import { List as ListMUI, ListItem, ListItemText } from "@mui/material";
import styled from "styled-components";

const List = styled(ListMUI)`
display:flex;
//flex-direction:row;
justify-content:center;
`


export const ListNav: React.VFC = () => {
  return (
    <List>
      <Link to="/">
        <ListItem>
          <ListItemText primary="Manage list" />
        </ListItem>
      </Link>
      <Link  to="add">
        <ListItem>
          <ListItemText primary="Add items" />
        </ListItem>
      </Link>
    </List>
  );
};
