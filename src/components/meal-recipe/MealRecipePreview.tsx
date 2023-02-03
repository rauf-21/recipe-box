import { useState } from "react";
import NextImage from "next/image";
import NextLink from "next/link";
import {
  Card,
  CardBody,
  Skeleton,
  Box,
  Text,
  Flex,
  Tag,
} from "@chakra-ui/react";

import type { MealRecipe } from "@/lib/meal-recipe";

interface MealRecipePreviewProps {
  mealRecipe?: MealRecipe;
}

export default function MealRecipePreview({
  mealRecipe,
}: MealRecipePreviewProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function handleImageLoadingComplete() {
    setIsImageLoaded(true);
  }

  return mealRecipe === undefined ? (
    <Card
      rounded="md"
      variant="outline"
    >
      <Skeleton
        w={300}
        h={250}
        rounded="md"
      ></Skeleton>
      <CardBody>
        <Flex
          direction="column"
          gap={2}
        >
          <Skeleton fitContent>
            <Text>Meal Recipe Name</Text>
          </Skeleton>
          <Flex gap={2}>
            <Skeleton fitContent>
              <Tag w="max">Category</Tag>
            </Skeleton>
            <Skeleton fitContent>
              <Tag w="max">Area</Tag>
            </Skeleton>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  ) : (
    <Card
      as={NextLink}
      sx={{
        _hover: {
          transform: "translate(0, -10px)",
          boxShadow: "0px 10px var(--chakra-colors-primary-600)",
          transition: "all 0.3s ease-in-out",
        },
      }}
      cursor="pointer"
      href={`/recipe/${mealRecipe.id}`}
      rounded="md"
      variant="outline"
    >
      <Box
        pos="relative"
        overflow="hidden"
        w="full"
        h="full"
        maxH={250}
        rounded="md"
      >
        <Skeleton
          w={300}
          isLoaded={isImageLoaded}
          rounded="md"
        >
          <NextImage
            alt={`${mealRecipe.name} image`}
            width={300}
            height={250}
            onLoadingComplete={handleImageLoadingComplete}
            src={mealRecipe.thumbnail}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Skeleton>
      </Box>
      <CardBody>
        <Flex
          direction="column"
          gap={2}
        >
          <Text
            maxW="calc(300px - 2.5rem)"
            fontWeight="bold"
          >
            {mealRecipe.name}
          </Text>
          <Flex gap={2}>
            <Tag
              w="max"
              colorScheme="primary"
            >
              {mealRecipe.category}
            </Tag>
            <Tag
              w="max"
              colorScheme="primary"
            >
              {mealRecipe.area}
            </Tag>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
