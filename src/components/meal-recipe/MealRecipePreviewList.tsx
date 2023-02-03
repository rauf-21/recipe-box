import { match } from "ts-pattern";
import { Grid, Box } from "@chakra-ui/react";

import type { MealRecipe } from "@/lib/meal-recipe";
import MealRecipePreview from "@/components/meal-recipe/MealRecipePreview";
import NoData from "@/components/common/NoData";

interface MealRecipePreviewListProps {
  mealRecipes?: MealRecipe[];
}

export default function MealRecipePreviewList({
  mealRecipes,
}: MealRecipePreviewListProps) {
  return (
    <Grid
      gap={10}
      templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
      {...(mealRecipes !== undefined &&
        mealRecipes.length === 0 && {
          templateColumns: "1fr",
        })}
    >
      {match(mealRecipes)
        .with(undefined, () =>
          Array(4)
            .fill(null)
            .map((_, index) => <MealRecipePreview key={index} />)
        )
        .with([], () => (
          <Box m={16}>
            <NoData />
          </Box>
        ))
        .otherwise((mealRecipes) =>
          mealRecipes.map((mealRecipe) => (
            <MealRecipePreview
              key={mealRecipe.id}
              mealRecipe={mealRecipe}
            />
          ))
        )}
    </Grid>
  );
}
