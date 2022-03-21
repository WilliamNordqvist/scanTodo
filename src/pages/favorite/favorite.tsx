import { List, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { StarIcon } from "../../components/icons/starIcon";
import { ListRowLink } from "../../components/listRow/listRow";
import { useStore } from "../../context/context";
import { TFavRec } from "../../types";

export const Favorite: React.VFC = () => {
  const [favRemoveArr, setRemoveArr] = useState<TFavRec[]>([]);
  const {
    recipes: { favRecipes, deleteFavRec },
  } = useStore();

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
          {favRecipes?.map((rec) => (
            <ListRowLink
              type="secondary"
              to={`/recipes/${rec.id}`}
              key={rec.id}
              icon={
                <Box>
                  <StarIcon
                    intVal={true}
                    onClick={() => setRemoveArr([...favRemoveArr, rec])}
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
        <Button onClick={() => deleteFavRec(favRemoveArr)}>Update List</Button>
      </Box>
    </Box>
  );
};
