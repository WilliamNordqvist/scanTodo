import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { database, recipe } from "../../api/api";
import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { Check } from "../../components/icons/check";
import { StarIcon } from "../../components/icons/starIcon";
import { Input } from "../../components/input/input";
import { ListRow } from "../../components/listRow/listRow";
import { Loading } from "../../components/loading/loading";
import { Selector } from "../../components/selector/selector";
import { CacheData } from "../../types";
import { generateId } from "../../utils/generateId";

export const RecipeList: React.VFC = () => {
  const { id } = useParams();
  const recipeId = id as string;
  const [inputValue, setInputValue] = useState("");
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const { data, refetch } = useQuery(
    ["getRecipe", recipeId],
    () => recipe.get(recipeId, portions),
    {
      onSuccess: (res) => setInputValue(res.Title),
    }
  );
  const { data: isAlreadySaved, refetch: refetchIsAlreadySaved } = useQuery(
    ["alreadySaved", id],
    () => recipe.alreadySaved(recipeId)
  );

  const [portions, setPortions] = useState("4");
  const { mutate: createList } = useMutation(database.createList);
  const { mutate: deleteFavRec } = useMutation(recipe.delete);
  const { mutate: saveFavorite } = useMutation(recipe.save);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [portions, refetch]);

  if (!data) return <Loading />;

  const addNewRecipelist = () => {
    const listId = generateId();
    const { Title, Ingredients } = data;
    const recipeToList: any[] | undefined = [Title, ...Ingredients]
      .filter((item) => !checkedItems.includes(item))
      .map((item, index) => {
        return {
          name: index === 0 ? data.Title : "",
          items: index === 0 ? "" : item,
          listId,
          isChecked: false,
          itemId: generateId() + index,
        };
      });

    if (recipeToList) {
      createList(recipeToList);
      queryClient.setQueryData<CacheData>("allList", (oldData) => {
        return [
          ...(oldData || []),
          {
            [listId]: recipeToList,
          },
        ];
      });
    }

    navigate(`/list/add`);
  };

  const addFavoriteRecipe = async () => {
    if (isAlreadySaved) {
      deleteFavRec([recipeId]);
      await refetchIsAlreadySaved();
      return;
    }
    saveFavorite({
      name: data.Title,
      id: recipeId,
    });
  };

  if (data.ErrorMessage) {
    return <Header as="h2">{data.ErrorMessage}</Header>;
  }

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box height="auto" overflow="scroll">
        <Header as="h2">Recipe ingredients</Header>
        <Box display="flex" justifyContent="center">
          <StarIcon intVal={isAlreadySaved} onClick={addFavoriteRecipe} />
        </Box>
        {inputValue && (
          <Input value={inputValue || ""} setValue={setInputValue} />
        )}
        {data.PortionOptions && (
          <Box sx={{ py: 1 }}>
            <Selector
              value={portions}
              onChange={(e) => setPortions(e.target.value)}
              placeholder="Portions"
              items={data.PortionOptions}
            />
          </Box>
        )}

        <Box component="ul" pl="0">
          {data.Ingredients.map((ingredient: string) => (
            <ListRow
              key={ingredient}
              icon={
                <Check
                  onClick={() => setCheckedItems([...checkedItems, ingredient])}
                />
              }
            >
              {ingredient}
            </ListRow>
          ))}
        </Box>
      </Box>
      <Box sx={{ width: "100%", mx: "auto" }} mt={2}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
          <Box width="40%">
            <Button
              onClick={() => navigate(`/recipes/instructions/${recipeId}`)}
            >
              instructions
            </Button>
          </Box>
          <Box width="40%">
            <Button onClick={addNewRecipelist}>add list</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
