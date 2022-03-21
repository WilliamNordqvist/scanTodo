import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, List } from "@mui/material";
import { Scanner } from "../../components/scanner/scanner";
import { useStore } from "../../context/context";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";
import { Loading } from "../../components/loading/loading";
import { AddIcon } from "../../components/icons/addIcon";
import { CameraIcon } from "../../components/icons/camera";
import { Check } from "../../components/icons/check";
import { ListRow } from "../../components/listRow/listRow";
import { generateId } from "../../utils/generateId";
import { Button } from "../../components/button/button";
import { TList, TListItem } from "../../types";

export const AddListItem: React.VFC = () => {
  const { id: ListId } = useParams<{ id: string }>();
  const [isModalOpen, toggleModal] = useState(false);
  const [selectedList, selectList] = useState<TList>();
  const [inputValue, setInputValue] = useState<string>("");

  const {
    list: {
      createListItems,
      allLists,
      checkListItem,
      deleteList,
      deleteListItem,
    },
  } = useStore();
  const navigate = useNavigate();

  const checkedItems =
    selectedList?.items.filter((item) => item.isChecked) || [];

  const addItem = () => {
    const newListItem: TListItem = {
      name: inputValue,
      id: generateId(),
      isChecked: false,
    };

    createListItems(ListId!, newListItem);
    setInputValue("");
  };

  useEffect(() => {
    if (allLists) {
      const list = allLists.filter((list) => list.id === ListId)[0];
      if (!list && allLists.length > 0) navigate("/list/add");
      selectList(list);
    }

    if (!allLists) navigate("/list/add");
  }, [ListId, allLists, navigate]);

  if (!allLists || !selectedList) {
    return <Loading />;
  }

  if (isModalOpen) {
    return <Scanner onScan={setInputValue} onClose={toggleModal} />;
  }

  const { items: ListItems, name: ListName } = selectedList;

  const inputIcon = inputValue ? (
    <AddIcon onClick={addItem} />
  ) : (
    <CameraIcon onClick={() => toggleModal(true)} />
  );

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box height="auto" overflow="scroll">
        <Header noMargin as="h2">
          {ListName}
        </Header>
        <Input
          value={inputValue}
          setValue={setInputValue}
          onEnter={addItem}
          icon={inputIcon}
        />
        <Box>
          <List>
            {ListItems.map((listItem) => (
              <ListRow
                key={listItem.id}
                icon={
                  <Check
                    defVal={listItem.isChecked}
                    onClick={() => checkListItem(ListId!, listItem)}
                  />
                }
              >
                {listItem.name}
              </ListRow>
            ))}
          </List>
        </Box>
      </Box>

      <Box sx={{ width: "50%", mx: "auto" }} mt={2}>
        {checkedItems.length > 0 ? (
          <Button onClick={() => deleteListItem(ListId!, checkedItems)}>
            Update List
          </Button>
        ) : (
          <Button onClick={() => deleteList(ListId!)} buttontype="delete">
            Delete List
          </Button>
        )}
      </Box>
    </Box>
  );
};
