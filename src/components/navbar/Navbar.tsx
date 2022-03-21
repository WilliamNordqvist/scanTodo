import React from "react";
import { default as AppBarMUI } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import styled from "styled-components";
import { Link as ReactLink } from "react-router-dom";
import { List as ListMUI, ListItem, ListItemText } from "@mui/material";


const AppBar = styled(AppBarMUI)`
  && {
    background-color: ${({theme}) => theme.color.secondaryBackground};
  }
`;
const Link = styled(ReactLink)`
  text-decoration: none;
  font-weight: 600;
`;

const List = styled(ListMUI)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-decoration: none;
`;

export const NavBar: React.VFC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <List>
            <Link to="/list/add">
              <ListItem>
                <ListItemText primary="LIST" />
              </ListItem>
            </Link>
            <Link to="/recipes">
              <ListItem>
                <ListItemText primary="ICA RECIPES" />
              </ListItem>
            </Link>
            <Link to="/favorite">
              <ListItem>
                <ListItemText primary="FAVORITE" />
              </ListItem>
            </Link>
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
