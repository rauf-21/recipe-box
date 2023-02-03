import dynamic from "next/dynamic";
import { useState } from "react";
import { capitalize } from "voca";
import {
  Box,
  AspectRatio,
  Flex,
  Heading,
  List,
  ListItem,
  ListIcon,
  Grid,
  GridItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Divider,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import { FiCircle } from "react-icons/fi";

import type { MealRecipe } from "@/lib/meal-recipe";
import StepListItem from "@/components/common/list/StepListItem";
import StepListItemOrder from "@/components/common/list/StepListItemOrder";
import StepListItemContent from "@/components/common/list/StepListItemContent";
import ToggleAddToFavoriteButton from "@/components/common/buttons/ToggleAddToFavoriteButton";
import ShareButton from "@/components/common/buttons/ShareButton";

interface MealRecipeInformationProps {
  label: string;
  value: string;
}

interface MealRecipeDetailProps {
  mealRecipe: MealRecipe;
}

const ReactPlayer = dynamic(() => import("react-player"), {
  ssr: false,
});

function MealRecipeInformation({ label, value }: MealRecipeInformationProps) {
  return (
    <Flex
      align="center"
      direction="column"
      gap={2}
    >
      <Text fontWeight="bold">{label}</Text>
      <Text>{value}</Text>
    </Flex>
  );
}

export default function MealRecipeDetail({
  mealRecipe,
}: MealRecipeDetailProps) {
  const [isVideoReady, setIsVideoReady] = useState(false);

  function handleVideoReady() {
    setIsVideoReady(true);
  }

  return (
    <Grid
      gap={10}
      templateColumns={{
        base: "1fr",
        lg: "2fr 3fr",
      }}
      templateAreas={{
        base: `
          "information"
          "ingredient-instruction-tab"
        `,
        lg: `"information ingredient-instruction-tab"`,
      }}
    >
      <>
        <GridItem
          as={Flex}
          pos={{
            base: "static",
            lg: "sticky",
          }}
          top={4}
          alignItems="center"
          flexDir="column"
          gap={4}
          area="information"
          h="max"
        >
          <Heading textAlign="center">{mealRecipe.name}</Heading>
          <AspectRatio
            overflow="hidden"
            w="full"
            maxW={500}
            ratio={4 / 3}
            rounded="lg"
          >
            <Skeleton isLoaded={isVideoReady}>
              <ReactPlayer
                url={mealRecipe.youtube}
                width="100%"
                height="100%"
                onReady={handleVideoReady}
              />
            </Skeleton>
          </AspectRatio>
          <Flex
            align="center"
            direction="row"
            gap={8}
          >
            <MealRecipeInformation
              label="Category"
              value={mealRecipe.category}
            />
            <Box h={12}>
              <Divider
                borderWidth={1}
                orientation="vertical"
              />
            </Box>
            <MealRecipeInformation
              label="Area"
              value={mealRecipe.area}
            />
          </Flex>
          <Flex gap={4}>
            <ToggleAddToFavoriteButton mealRecipe={mealRecipe} />
            <ShareButton />
          </Flex>
        </GridItem>
        <GridItem
          as={Tabs}
          area="ingredient-instruction-tab"
          colorScheme="primary"
          variant="capsule"
        >
          <TabList>
            <Tab>Ingredients</Tab>
            <Tab>Instructions</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <List
                as={Grid}
                gap={4}
                gridTemplateColumns="repeat(2, 1fr)"
              >
                {mealRecipe.ingredients.map((ingredient, index) => (
                  <ListItem
                    key={index}
                    alignItems="center"
                    display="flex"
                  >
                    <ListIcon
                      as={FiCircle}
                      boxSize={6}
                      color="primary.600"
                      strokeWidth={4}
                    />
                    {capitalize(`${mealRecipe.measures[index]} ${ingredient}`)}
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List>
                {mealRecipe.instructions.map((instruction, index) => (
                  <StepListItem key={index}>
                    <StepListItemOrder>{index + 1}</StepListItemOrder>
                    <StepListItemContent>{instruction}</StepListItemContent>
                  </StepListItem>
                ))}
              </List>
            </TabPanel>
          </TabPanels>
        </GridItem>
      </>
    </Grid>
  );
}
