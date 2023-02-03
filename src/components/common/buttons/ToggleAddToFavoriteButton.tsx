import { useState, useEffect } from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FiHeart, FiX } from "react-icons/fi";

import type { MealRecipe } from "@/lib/meal-recipe";
import {
  isFavoriteMealRecipe,
  addToFavoriteMealRecipes,
  removeFromFavoriteMealRecipes,
} from "@/lib/favorite-meal-recipe";

interface ToggleAddToFavoriteButtonProps {
  mealRecipe: MealRecipe;
}

export default function ToggleAddToFavoriteButton({
  mealRecipe,
}: ToggleAddToFavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  async function handleAddToFavoriteButtonClick() {
    try {
      await addToFavoriteMealRecipes(mealRecipe);

      setIsFavorite(true);
    } catch (err) {
      setIsFavorite(false);
    }
  }

  async function handleRemoveFromFavoriteMealRecipes() {
    try {
      await removeFromFavoriteMealRecipes(mealRecipe.id);
      setIsFavorite(false);
    } catch (err) {
      setIsFavorite(true);
    }
  }

  useEffect(() => {
    (async () => {
      const result = await isFavoriteMealRecipe(mealRecipe.id);

      setIsFavorite(result);
    })();
  }, [mealRecipe.id]);

  return (
    <Button
      {...(isFavorite
        ? {
            borderWidth: 2,
            colorScheme: "primary",
            leftIcon: <Icon as={FiX} />,
            variant: "outline",
            onClick: handleRemoveFromFavoriteMealRecipes,
          }
        : {
            color: "white",
            bg: "primary.600",
            colorScheme: "primary",
            leftIcon: <Icon as={FiHeart} />,
            onClick: handleAddToFavoriteButtonClick,
          })}
    >
      {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
    </Button>
  );
}
