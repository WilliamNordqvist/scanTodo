import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { recipe } from "../../api/api";
import { Header } from "../../components/header/header";
import { Box, Button, Grid, MobileStepper } from "@mui/material";
import styled from "styled-components";
import { Typography } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useQuery } from "react-query";
import { Loading } from "../../components/loading/loading";

const Slider = styled(MobileStepper)`
  && {
    margin: auto;
    background: transparent;
    & .MuiMobileStepper-dotActive {
      background: ${({ theme }) => theme.color.primaryTextColor};
    }
  }
`;

const Instruction = styled(Typography)`
  padding: ${({ theme }) => theme.sizes.small};
  border: 2px solid ${({ theme }) => theme.color.primaryTextColor};
  border-radius: ${({ theme }) => theme.sizes.xsmall};
`;

export const RecipeInstructions: React.VFC = () => {
  const { id } = useParams();
  const recipeId = id as string;
  const [index, setIndex] = useState(0);
  const { data } = useQuery(["instructions", recipeId], () =>
    recipe.get(recipeId, "2")
  );

  if (!data) return <Loading />;

  const { Instructions } = data;

  return (
    <>
      {Instructions && (
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
            <Instruction
              align="center"
              dangerouslySetInnerHTML={{
                __html: Instructions[index],
              }}
            />
          </Grid>
          <Grid item>
            <Slider
              steps={Instructions.length}
              position="static"
              activeStep={index}
              sx={{ maxWidth: 400 }}
              nextButton={
                <Button
                  onClick={() => setIndex(index + 1)}
                  disabled={index === Instructions.length - 1}
                >
                  <KeyboardArrowRight fontSize="large" />
                </Button>
              }
              backButton={
                <Button
                  onClick={() => setIndex(index - 1)}
                  disabled={index === 0}
                >
                  <KeyboardArrowLeft fontSize="large" />
                </Button>
              }
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};
