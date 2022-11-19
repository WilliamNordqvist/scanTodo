import { List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { recipe } from "../../api/api";
import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { StarIcon } from "../../components/icons/starIcon";
import { ListRowLink } from "../../components/listRow/listRow";
import { TFavorites } from "../../types";

export const Favorite: React.VFC = () => {
  const [idToDelete, setIdToDelete] = useState<number[]>([])
  const { data } = useQuery("favorites", recipe.getFavorites);
  const { mutate: deleteFavRec } = useMutation(recipe.delete);
  const queryClient = useQueryClient();
  
  return (
    <Box
      height={"100%"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box height="auto" overflow="scroll">
        <Header as="h2">FAVORITE</Header>
        <List>
          {data && data.map((rec) => (
            <ListRowLink
              type="secondary"
              to={`/recipes/${rec.id}`}
              key={rec.id}
              icon={
                <Box>
                  <StarIcon
                    intVal={true}
                    onClick={() => setIdToDelete([...idToDelete, rec.id])}
                  />
                </Box>
              }
            >
              <Typography noWrap>{rec.name}</Typography>
            </ListRowLink>
          ))}
        </List>
      </Box>
      <Box sx={{ width: "50%", mx: "auto" }} mt={2}>
        <Button
        disabled={idToDelete.length === 0} 
        onClick={() => {
          deleteFavRec(idToDelete);
          queryClient.setQueryData<TFavorites[]>('favorites', (oldData) => oldData!.filter((rec) => !idToDelete.includes(rec.id)))
          }}>Update List</Button>
      </Box>
    </Box>
  );
};
