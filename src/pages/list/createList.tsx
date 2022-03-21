import React, { useState } from "react";
import { useStore } from "../../context/context";
import { AddIcon } from "../../components/icons/addIcon";
import { Input } from "../../components/input/input";
import { ListCard } from "../../components/listCard/listCard";
import { Box, List } from "@mui/material";
import { Header } from "../../components/header/header";
import { Settings } from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SettingIcon = styled(Settings)`
  && {
    position: absolute;
    left: ${(props) => props.theme.sizes.xsmall};
    top: ${(props) => props.theme.sizes.xsmall};
    path {
      color:${({theme}) => theme.color.settingIcon};
    }
  }
`;

export const CreateList: React.VFC = () => {
  const [newListName, setNewListName] = useState<string>("");
  const {
    list: { allLists, createNewList, deleteList },
  } = useStore();

  const addNewlist = () => {
    createNewList(newListName);
    setNewListName("");
  };
  return (
    <>
      <Link to="/setting">
        <SettingIcon />
      </Link>

      <Header as="h2">Add List</Header>
      <Input
        value={newListName}
        setValue={setNewListName}
        onEnter={addNewlist}
        icon={<AddIcon onClick={addNewlist} />}
      />
      <List>
        <Box display="flex" flexWrap="wrap" justifyContent="center">
          {allLists?.map((list) => (
            <ListCard onDelete={deleteList} key={list.id} list={list} />
          ))}
        </Box>
      </List>
    </>
  );
};
