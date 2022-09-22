import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, List } from "@mui/material";
import { Scanner } from "../../components/scanner/scanner";
import { Header } from "../../components/header/header";
import { Input } from "../../components/input/input";
import { Loading } from "../../components/loading/loading";
import { AddIcon } from "../../components/icons/addIcon";
import { CameraIcon } from "../../components/icons/camera";
import { Check } from "../../components/icons/check";
import { ListRow } from "../../components/listRow/listRow";
import { generateId } from "../../utils/generateId";
import { Button } from "../../components/button/button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { database } from "../../api/api";
import { RawTlistFull, RawTlist } from "../../types";

export const AddListItem: React.VFC = () => {
  const { id } = useParams();
  const listId = id as string;
  const [isModalOpen, toggleModal] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const navigate = useNavigate();
  const { data, error } = useQuery(listId, () => database.getList(listId));
  const { mutate: updateItem } = useMutation(database.update);
  const { mutate: onDelete } = useMutation(database.delete);
  const { mutate: addListItem } = useMutation(database.createListItem, {
    onError: () => navigate("/list/add"),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (error) navigate("/list/add");
  }, [error, navigate]);

  if (!data) {
    return <Loading />;
  }

  const onCheckItem = (id: number) => {
    const newdata = data.map((list) => {
      if (list.itemId === id) {
        return {
          ...list,
          isChecked: !list.isChecked,
        };
      }
      return list;
    });

    queryClient.setQueryData(listId, newdata);
    updateItem(newdata.find(({ itemId }) => itemId === id) as RawTlistFull);
  };

  const onAddItem = () => {
    const [firstRow, ...restOfRows] = data;
    const newListItem = {
      name: "",
      items: inputValue,
      listId: firstRow.listId,
      isChecked: false,
      itemId: generateId(),
    };

    queryClient.setQueryData(listId, [firstRow, newListItem, ...restOfRows]);
    addListItem(newListItem);
    setInputValue("");
  };

  if (isModalOpen) {
    return <Scanner onScan={setInputValue} onClose={toggleModal} />;
  }

  const [first, ...rest] = data;
  const checkedItems = rest.filter(({ isChecked }) => isChecked);

  const onDeleteListItem = () => {
    const newData = data.filter((item) => !checkedItems.includes(item));
    queryClient.setQueryData(listId, newData);
    onDelete({
      itemId: checkedItems.map((item) => Number(item.itemId)),
    });
  };

  const onDeleteList = () => {
    onDelete({ listId: Number(listId) });
    navigate("/list/add");
    queryClient.setQueryData<{ [id: number]: RawTlist[] }[]>(
      "allList",
      (oldData) => {
        return oldData?.filter((list) => Object.keys(list)[0] !== listId) as {
          [id: number]: RawTlist[];
        }[];
      }
    );
  };

  const inputIcon = inputValue ? (
    <AddIcon onClick={onAddItem} />
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
          {first.name}
        </Header>
        <Input
          value={inputValue}
          setValue={setInputValue}
          onEnter={onAddItem}
          icon={inputIcon}
        />
        <Box>
          <List>
            {rest.map(({ itemId, isChecked, items }) => (
              <ListRow
                key={itemId}
                icon={
                  <Check
                    isChecked={isChecked}
                    defVal={isChecked}
                    onClick={() => onCheckItem(Number(itemId))}
                  />
                }
              >
                {items}
              </ListRow>
            ))}
          </List>
        </Box>
      </Box>

      <Box sx={{ width: "50%", mx: "auto" }} mt={2}>
        {checkedItems.length > 0 ? (
          <Button onClick={onDeleteListItem}>Update List</Button>
        ) : (
          <Button onClick={onDeleteList} buttontype="delete">
            Delete List
          </Button>
        )}
      </Box>
    </Box>
  );
};
