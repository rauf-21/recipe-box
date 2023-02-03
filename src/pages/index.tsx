import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import type { DehydratedState } from "react-query";
import { useRouter } from "next/router";
import { dehydrate, useQuery, QueryClient } from "react-query";
import {
  Grid,
  GridItem,
  Flex,
  Heading,
  Highlight,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FiShuffle } from "react-icons/fi";

import {
  getRandomMealRecipeQuery,
  getMealRecipeCategoriesQuery,
  getMealRecipeAreasQuery,
  searchMealRecipesQuery,
} from "@/lib/meal-recipe";
import MainLayout from "@/components/layouts/MainLayout";
import SideBar from "@/components/common/SideBar";
import MealRecipeSearchMenu from "@/components/meal-recipe/MealRecipeSearchMenu";
import MealRecipePreview from "@/components/meal-recipe/MealRecipePreview";
import MealRecipePreviewList from "@/components/meal-recipe/MealRecipePreviewList";

interface HomePageProps {
  dehydratedState: DehydratedState;
  name?: string;
  category?: string;
  area?: string;
}

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<HomePageProps>
> {
  const queryClient = new QueryClient();

  const {
    name,
    category,
    area,
  }: { name?: string; category?: string; area?: string } = query;

  if (name !== undefined || category !== undefined || area !== undefined) {
    await queryClient.prefetchQuery("searchedMealRecipes", (context) =>
      searchMealRecipesQuery({ name, category, area }, context)
    );
  }

  await queryClient.prefetchQuery("randomMealRecipe", (context) =>
    getRandomMealRecipeQuery(context)
  );

  await queryClient.prefetchQuery("mealRecipeCategories", (context) =>
    getMealRecipeCategoriesQuery(context)
  );

  await queryClient.prefetchQuery("mealRecipeAreas", (context) =>
    getMealRecipeAreasQuery(context)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(name !== undefined && { name }),
      ...(category !== undefined && { category }),
      ...(area !== undefined && { area }),
    },
  };
}

function WelcomeSection() {
  const {
    data: randomMealRecipe,
    isRefetching,
    refetch,
  } = useQuery("randomMealRecipe", (context) =>
    getRandomMealRecipeQuery(context)
  );

  async function handleGetRandomMealRecipeButtonClick() {
    await refetch();
  }

  return (
    <Flex
      align="center"
      direction="column"
      gap={6}
      w="full"
      my={10}
    >
      <Heading size="xl">
        <Highlight
          query="recipe box"
          styles={{
            textDecoration: "underline",
            textDecorationColor: "primary.600",
            textDecorationThickness: 6,
          }}
        >
          Welcome to Recipe Box
        </Highlight>
      </Heading>
      <Flex
        align="center"
        direction="column"
        gap={1}
        fontSize="xl"
        textAlign="center"
      >
        <Text>Here&apos;s a random meal recipe to get you started!</Text>
      </Flex>
      <MealRecipePreview
        mealRecipe={isRefetching ? undefined : randomMealRecipe}
      />

      <Button
        colorScheme="primary"
        leftIcon={<Icon as={FiShuffle} />}
        onClick={handleGetRandomMealRecipeButtonClick}
        variant="capsuleSolid"
      >
        Get Another Random Meal Recipe
      </Button>
    </Flex>
  );
}

export default function HomePage({ name, category, area }: HomePageProps) {
  const router = useRouter();

  const { data: searchedMealRecipes } = useQuery(
    "searchedMealRecipes",
    (context) => searchMealRecipesQuery({ name, category, area }, context)
  );

  const hasSearchQuery =
    name !== undefined || category !== undefined || area !== undefined;

  function handleSearch(name: string, category: string, area: string) {
    router.push({
      query: {
        ...(name !== "" && { name }),
        ...(category !== "" && { category }),
        ...(area !== "" && { area }),
      },
    });
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
          mb={10}
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
            {hasSearchQuery ? (
              <MealRecipePreviewList mealRecipes={searchedMealRecipes} />
            ) : (
              <WelcomeSection />
            )}
          </GridItem>
        </Grid>
      </MainLayout>
    </>
  );
}
