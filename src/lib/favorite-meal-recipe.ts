import type { MealRecipe } from "@/lib/meal-recipe";

import { FAVORITE_MEAL_RECIPES_STORE_NAME, openAppIDB } from "@/lib/idb";

export async function getFavoriteMealRecipe(id: MealRecipe["id"]) {
  const appIDB = await openAppIDB();

  return appIDB.get(FAVORITE_MEAL_RECIPES_STORE_NAME, id);
}

export async function getAllFavoriteMealRecipes() {
  const appIDB = await openAppIDB();

  return appIDB.getAll(FAVORITE_MEAL_RECIPES_STORE_NAME);
}

export async function isFavoriteMealRecipe(id: MealRecipe["id"]) {
  const favoriteMealRecipe = await getFavoriteMealRecipe(id);

  return favoriteMealRecipe !== undefined;
}

export async function addToFavoriteMealRecipes(mealRecipe: MealRecipe) {
  const appIDB = await openAppIDB();

  return appIDB.put(FAVORITE_MEAL_RECIPES_STORE_NAME, mealRecipe);
}

export async function removeFromFavoriteMealRecipes(id: MealRecipe["id"]) {
  const appIDB = await openAppIDB();

  return appIDB.delete(FAVORITE_MEAL_RECIPES_STORE_NAME, id);
}
