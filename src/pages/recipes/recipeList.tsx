import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRecipe } from "../../api/api";
import { Button } from "../../components/button/button";
import { Header } from "../../components/header/header";
import { Check } from "../../components/icons/check";
import { StarIcon } from "../../components/icons/starIcon";
import { Input } from "../../components/input/input";
import { ListRow } from "../../components/listRow/listRow";
import { Loading } from "../../components/loading/loading";
import { Selector } from "../../components/selector/selector";
import { useStore } from "../../context/context";
import { TRecipe, TListItem } from "../../types";
import { generateId } from "../../utils/generateId";



export const RecipeList: React.VFC = () => {
  const { id: recipeId } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<TRecipe>();
  const [inputValue, setInputValue] = useState<string>("");
  const [ingredientsArr, setIngredients] = useState<string[]>([]);
  const [checkedIngred, setCheckedIngred] = useState<string[]>([]);
  const [portions, setPortions] = useState("4");
  const {
    list: { createNewList },
    recipes: { addFavRecipe, isRecAlreadyAdded },
  } = useStore();
  const navigate = useNavigate();
  const hasCheckedItems = checkedIngred.length > 0;
  const recAlreadyAdded = isRecAlreadyAdded(recipeId!);

  const addNewRecipelist = () => {
    const listId = generateId();
    const ingredientsToItems: TListItem[] = ingredientsArr!.map(
      (item, index) => {
        return {
          name: item,
          id: generateId() + index,
          isChecked: false,
        };
      }
    );
    createNewList(inputValue, listId, ingredientsToItems);

    navigate(`/list/add/${listId}`);
  };

  const deleteIngred = () => {
    const ingredToDelete = new Set(checkedIngred);
    const newArr = ingredientsArr.filter(
      (ingredient) => !ingredToDelete.has(ingredient)
    );
    setIngredients(newArr);
    setCheckedIngred([]);
  };

  const onCheckedItem = (ingredient: string) => {
    if (checkedIngred.includes(ingredient)) {
      const newArr = checkedIngred.filter((i) => i !== ingredient);
      setCheckedIngred(newArr);
      return null;
    }

    setCheckedIngred([...checkedIngred, ingredient]);
  };

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) return null;
      const data = await getRecipe(recipeId, portions);
      setRecipe(data);
      setInputValue(data.Title || " ");
      setIngredients(data.Ingredients!);
    };
    fetchRecipe();
  }, [recipeId, portions]);

  if (!recipe) return <Loading />;

  if (recipe.ErrorMessage) {
    return <Header as="h2">{recipe.ErrorMessage}</Header>;
  }

  return (
    <Box
      height={"100%"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box height="auto" overflow="scroll">
        <Header as="h2">Recipe ingredients</Header>
        <Box display="flex" justifyContent="center">
          <StarIcon
            intVal={recAlreadyAdded}
            onClick={() => addFavRecipe({ name: inputValue, id: recipeId! })}
          />
        </Box>
        <Input value={inputValue} setValue={setInputValue} />
        {recipe.PortionOptions && (
          <Box sx={{ py: 1 }}>
            <Selector
              value={portions}
              onChange={(e) => setPortions(e.target.value)}
              placeholder="Portions"
              items={recipe.PortionOptions}
            />
          </Box>
        )}

        <Box component="ul" pl="0">
          {ingredientsArr.map((ingredient: string) => (
            <ListRow
              key={ingredient}
              icon={<Check onClick={() => onCheckedItem(ingredient)} />}
            >
              {ingredient}
            </ListRow>
          ))}
        </Box>
      </Box>
      <Box sx={{ width: "100%", mx: "auto" }} mt={2}>
        {hasCheckedItems && !recAlreadyAdded ? (
          <Button buttontype="delete" onClick={deleteIngred}>
            delete
          </Button>
        ) : (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
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
        )}
      </Box>
    </Box>
  );
};
