import React from "react";
import { ListItem as ListItemMUI } from "@mui/material";
import { DeleteIcon } from "../icons/deleteIcon";
import styled from "styled-components";
import { Link as LinkMUI } from "react-router-dom";
import { TList } from "../../types";

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

    &: active { 
      box-shadow: rgba(50, 50, 93, 0.25) 3px 3px 6px 0px inset, rgba(0, 0, 0, 0.3) -3px -3px 6px 1px inset;
    }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  height: 100%;
  width:100%;

  button {
    margin: auto;
    margin-bottom: 0;
  }
`;

const Link = styled(LinkMUI)`
  text-decoration: none;
  text-align: center;
  height:100%;

  p {
    margin: 0;
    color: ${({ theme }) => theme.color.secondaryTextColor};;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

type TListItem = {
  onDelete: (id: string) => void;
  list: TList;
};

export const ListCard: React.VFC<TListItem> = ({ list, onDelete }) => {
  const { name, id, items } = list;
  return (
    <StyledListCard>
      <Wrapper>
        <Link key={id} to={id}>
          <p>{name}</p>
          <p>Items: {items?.length}</p>
        </Link>
        <DeleteIcon onClick={() => onDelete(id)} />
      </Wrapper>
    </StyledListCard>
  );
};
