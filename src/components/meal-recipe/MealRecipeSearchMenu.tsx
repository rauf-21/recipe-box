import type { ChangeEvent } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  Flex,
  Input,
  IconButton,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import {
  getMealRecipeCategoriesQuery,
  getMealRecipeAreasQuery,
} from "@/lib/meal-recipe";

interface MealRecipeSearchMenuProps {
  onSearch: (name: string, category: string, area: string) => void;
}

export default function MealRecipeSearchMenu({
  onSearch,
}: MealRecipeSearchMenuProps) {
  const { data: mealRecipeCategories, status: mealRecipeCategoriesStatus } =
    useQuery("mealRecipeCategories", (context) =>
      getMealRecipeCategoriesQuery(context)
    );

  const { data: mealRecipeAreas, status: mealRecipeAreasStatus } = useQuery(
    "mealRecipeAreas",
    (context) => getMealRecipeAreasQuery(context)
  );

  const isMealRecipeCategoriesEmpty =
    mealRecipeCategories === undefined || mealRecipeCategories.length === 0;

  const isMealRecipeAreasEmpty =
    mealRecipeAreas === undefined || mealRecipeAreas.length === 0;

  const [name, setName] = useState("");

  const [category, setCategory] = useState("");

  const [area, setArea] = useState("");

  function handleSearchButtonClick() {
    onSearch(name, category, area);
  }

  function handleSearchInputChange(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function handleCategorySelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value);
  }

  function handleAreaSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    setArea(e.target.value);
  }

  return (
    <Flex
      direction="column"
      gap={4}
      w="full"
    >
      {mealRecipeCategoriesStatus === "error" && (
        <Alert
          rounded="md"
          status="error"
        >
          <AlertIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Couldn&apos;t fetch meal recipe categories. Try reloading the page.
          </AlertDescription>
        </Alert>
      )}
      {mealRecipeAreasStatus === "error" && (
        <Alert
          rounded="md"
          status="error"
        >
          <AlertIcon />
          <AlertTitle>Something went wrong!</AlertTitle>
          <AlertDescription>
            Couldn&apos;t fetch meal recipe areas. Try reloading the page.
          </AlertDescription>
        </Alert>
      )}
      <Flex w="full">
        <Input
          onChange={handleSearchInputChange}
          placeholder="Search meal recipe here..."
          roundedLeft="full"
        />
        <IconButton
          borderLeft="none"
          aria-label="search button"
          icon={<FiSearch />}
          onClick={handleSearchButtonClick}
          roundedLeft="none"
          roundedRight="full"
          variant="outline"
        />
      </Flex>
      <Flex
        alignSelf="end"
        gap={4}
      >
        <Select
          w="max"
          onChange={handleCategorySelectChange}
          placeholder="Category"
          rounded="full"
        >
          {isMealRecipeCategoriesEmpty
            ? null
            : mealRecipeCategories.map((mealRecipeCategory) => (
                <option
                  key={mealRecipeCategory.name}
                  value={mealRecipeCategory.name}
                >
                  {mealRecipeCategory.name}
                </option>
              ))}
        </Select>
        <Select
          w="max"
          onChange={handleAreaSelectChange}
          placeholder="Area"
          rounded="full"
        >
          {isMealRecipeAreasEmpty
            ? null
            : mealRecipeAreas.map((mealRecipeArea) => (
                <option
                  key={mealRecipeArea.name}
                  value={mealRecipeArea.name}
                >
                  {mealRecipeArea.name}
                </option>
              ))}
        </Select>
      </Flex>
    </Flex>
  );
}
