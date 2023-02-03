import type { GetServerSidePropsResult } from "next";
import type { DehydratedState } from "react-query";
import { useState, useEffect } from "react";
import { dehydrate, QueryClient } from "react-query";
import { Grid, GridItem } from "@chakra-ui/react";

import type { MealRecipe } from "@/lib/meal-recipe";
import {
  getMealRecipeCategoriesQuery,
  getMealRecipeAreasQuery,
} from "@/lib/meal-recipe";
import { getAllFavoriteMealRecipes } from "@/lib/favorite-meal-recipe";
import MainLayout from "@/components/layouts/MainLayout";
import SideBar from "@/components/common/SideBar";
import MealRecipeSearchMenu from "@/components/meal-recipe/MealRecipeSearchMenu";
import MealRecipePreviewList from "@/components/meal-recipe/MealRecipePreviewList";

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
  }>
> {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("mealRecipeCategories", (context) =>
    getMealRecipeCategoriesQuery(context)
  );

  await queryClient.prefetchQuery("mealRecipeAreas", (context) =>
    getMealRecipeAreasQuery(context)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function FavoriteMealRecipePage() {
  const [favoriteMealRecipes, setFavoriteMealRecipes] = useState<
    MealRecipe[] | undefined
  >(undefined);

  const [filteredMealRecipes, setFilteredMealRecipes] = useState<MealRecipe[]>(
    []
  );

  useEffect(() => {
    (async () => {
      const favoriteMealRecipes = await getAllFavoriteMealRecipes();

      setFavoriteMealRecipes(favoriteMealRecipes);
      setFilteredMealRecipes(favoriteMealRecipes);
    })();
  }, []);

  function handleSearch(name: string, category: string, area: string) {
    if (favoriteMealRecipes === undefined) {
      return;
    }

    setFilteredMealRecipes(
      name !== undefined || category !== undefined || area !== undefined
        ? favoriteMealRecipes?.filter(
            (favoriteMealRecipe) =>
              favoriteMealRecipe.name
                .toLowerCase()
                .includes(name.toLowerCase()) &&
              favoriteMealRecipe.category
                .toLowerCase()
                .startsWith(category.toLowerCase()) &&
              favoriteMealRecipe.area
                .toLowerCase()
                .startsWith(area.toLowerCase())
          )
        : favoriteMealRecipes
    );
  }

  return (
    <>
      <MainLayout>
        <Grid
          gap={4}
          templateColumns={{
            base: "1fr",
            lg: "1fr 3fr",
          }}
          w="full"
        >
          <GridItem
            display={{
              base: "none",
              lg: "block",
            }}
          >
            <SideBar />
          </GridItem>
          <GridItem
            flexDir="column"
            gap={4}
            display="flex"
            w="full"
            boxSizing="border-box"
          >
            <MealRecipeSearchMenu onSearch={handleSearch} />
            <MealRecipePreviewList mealRecipes={filteredMealRecipes} />
          </GridItem>
        </Grid>
      </MainLayout>
    </>
  );
}
