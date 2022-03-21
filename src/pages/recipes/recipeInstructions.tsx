import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipe } from "../../api/api";
import { Header } from "../../components/header/header";
import { Box, Button, Grid, MobileStepper } from "@mui/material";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const Slider = styled(MobileStepper)`
  && {
    margin: auto;
    background: transparent;
    & .MuiMobileStepper-dotActive {
      background: ${({ theme }) => theme.color.primaryTextColor};
    }
  }
`;

const Instuction = styled(Typography)`
  padding: ${({ theme }) => theme.sizes.small};
  border: 2px solid ${({ theme }) => theme.color.primaryTextColor};
  border-radius: ${({ theme }) => theme.sizes.xsmall};
`;

export const RecipeInstructions: React.VFC = () => {
  const { id: recipeId } = useParams<{ id: string }>();
  const [instructions, setInstructions] = useState<string[]>([]);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const fetchRecipe = async () => {
      if (!recipeId) return null;
      const data = await getRecipe(recipeId, "2");
      setInstructions(data.Instructions || []);
    };
    fetchRecipe();
  }, [recipeId]);
  
  

  return (
    <Grid
      height="100%"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
    >
      <Grid item>
        <Box mb={10}>
          <Header as="h2">Instructions</Header>
        </Box>
        <Instuction
          align="center"
          dangerouslySetInnerHTML={{
            __html: instructions[index],
          }}
        />
      </Grid>
      <Grid item>
        <Slider
          steps={instructions.length}
          position="static"
          activeStep={index}
          sx={{ maxWidth: 400 }}
          nextButton={
            <Button onClick={() => setIndex(index + 1)} disabled={index === instructions.length -1}>
              <KeyboardArrowRight fontSize="large" />
            </Button>
          }
          backButton={
            <Button onClick={() => setIndex(index - 1)} disabled={index === 0}>
              <KeyboardArrowLeft fontSize="large" />
            </Button>
          }
        />
      </Grid>
    </Grid>
  );
};
