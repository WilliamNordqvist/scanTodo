import React from "react";
import { ListItem as ListItemMUI } from "@mui/material";
import { DeleteIcon } from "../icons/deleteIcon";
import styled from "styled-components";
import { Link as LinkMUI } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { database } from "../../api/api";
import { RawTlist } from "../../types";

const StyledListCard = styled(ListItemMUI)`
  && {
    width: ${({ theme }) => theme.sizes.xlarge};
  }
  background: ${({ theme }) => theme.color.listCard};
  height: ${({ theme }) => theme.sizes.xlarge};
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 0 ${({ theme }) => theme.sizes.xsmall}
    ${({ theme }) => theme.sizes.xsmall} 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
  width: 100%;

  button {
    margin: auto;
    margin-bottom: 0;
  }
`;

const Link = styled(LinkMUI)`
  text-decoration: none;
  text-align: center;
  height: 100%;

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.secondaryTextColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const ListCard: React.VFC<{ list: RawTlist[] }> = ({ list }) => {
  const { name, listId } = list[0];
  const { mutate:onDeleteList } = useMutation(database.delete);
  const queryClient = useQueryClient();

  const deleteList = () => {
    onDeleteList({ listId });
    queryClient.setQueryData<{[id: number]: RawTlist[]}[]>("allList", (oldData) => {
      return oldData?.filter((list) => Number(Object.keys(list)) !== listId) as {[id: number]: RawTlist[]}[];
    });
  };
  return (
    <StyledListCard>
      <Wrapper>
        <Link key={listId} to={JSON.stringify(listId)}>
          <p>{name}</p>
          <p>Items: {list.length -1}</p>
        </Link>
        <DeleteIcon onClick={deleteList} />
      </Wrapper>
    </StyledListCard>
  );
};
