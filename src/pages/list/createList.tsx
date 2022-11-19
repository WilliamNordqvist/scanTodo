import React, { useState } from "react";
import { AddIcon } from "../../components/icons/addIcon";
import { Input } from "../../components/input/input";
import { ListCard } from "../../components/listCard/listCard";
import { Box, List } from "@mui/material";
import { Header } from "../../components/header/header";
import { Settings } from "@mui/icons-material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { database } from "../../api/api";
import { generateId } from "../../utils/generateId";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Loading } from "../../components/loading/loading";
import { RawTlistFull } from "../../types";

const SettingIcon = styled(Settings)`
  && {
    position: absolute;
    left: ${(props) => props.theme.sizes.xsmall};
    top: ${(props) => props.theme.sizes.xsmall};
    path {
      color: ${({ theme }) => theme.color.settingIcon};
    }
  }
`;

export const CreateList: React.VFC = () => {
  const [newListName, setNewListName] = useState<string>("");
  const { mutate } = useMutation(database.createList);
  const { data, isLoading } = useQuery("allList", database.getAllList);
  const queryClient = useQueryClient();

  if (isLoading) {
    return <Loading />;
  }

  const addNewlist = () => {
    const listId = generateId();
    const newData: RawTlistFull = {
      name: newListName,
      items: "",
      listId,
      isChecked: false,
      itemId: "",
    };

    queryClient.setQueryData("allList", [
      ...(data || []),
      {
        [listId]: [newData],
      },
    ]);
    mutate([newData]);
    setNewListName("");
  };

  return (
    <>
      <Link to="/setting">
        <SettingIcon />
      </Link>
      <Input
        value={newListName}
        setValue={setNewListName}
        onEnter={addNewlist}
        icon={<AddIcon onClick={addNewlist} />}
      />

      <Header as="h2">Add List</Header>
      {(!data || data.length !== 0) && (
        <List>
          <Box display="flex" flexWrap="wrap" justifyContent="center">
            {data &&
              data.map((listObj) => {
                const [key, list] = Object.entries(listObj)[0];
                return <ListCard key={key} list={list} />;
              })}
          </Box>
        </List>
      )}
    </>
  );
};
