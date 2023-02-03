import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import type { DehydratedState } from "react-query";
import { dehydrate, useQuery, QueryClient } from "react-query";
import { Text } from "@chakra-ui/react";

import { getMealRecipeQuery } from "@/lib/meal-recipe";
import SEO from "@/components/common/SEO";
import MainLayout from "@/components/layouts/MainLayout";
import MealRecipeDetail from "@/components/meal-recipe/MealRecipeDetail";

interface MealRecipeDetailPageProps {
  dehydratedState: DehydratedState;
  recipeId: string;
  url: string;
}

export async function getServerSideProps({
  req,
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<MealRecipeDetailPageProps>
> {
  const queryClient = new QueryClient();

  const recipeId = query.recipeId as string;

  await queryClient.prefetchQuery("mealRecipe", (context) =>
    getMealRecipeQuery(recipeId, context)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      recipeId,
      url: req.headers.referer!,
    },
  };
}

export default function MealRecipeDetailPage({
  recipeId,
  url,
}: MealRecipeDetailPageProps) {
  const { data: mealRecipe } = useQuery("mealRecipe", (context) =>
    getMealRecipeQuery(recipeId, context)
  );

  return (
    <MainLayout>
      {mealRecipe === undefined ? (
        <Text>hi</Text>
      ) : (
        <>
          <SEO
            title={mealRecipe.name}
            openGraph={{
              url,
              type: "website",
              title: mealRecipe.name,
              description: `Recipe to make ${mealRecipe.name}`,
              image: mealRecipe.thumbnail,
            }}
          />
          <MealRecipeDetail mealRecipe={mealRecipe} />
        </>
      )}
    </MainLayout>
  );
}
