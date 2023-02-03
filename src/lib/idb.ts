import type { DBSchema } from "idb";
import { openDB } from "idb";

import type { MealRecipe } from "@/lib/meal-recipe";

const DB_NAME = "recipe-box-db";

const DB_VERSION = 1;

export const FAVORITE_MEAL_RECIPES_STORE_NAME = "favorite-meal-recipes";

interface AppIDB extends DBSchema {
  [FAVORITE_MEAL_RECIPES_STORE_NAME]: {
    value: MealRecipe;
    key: string;
  };
}

export function openAppIDB() {
  return openDB<AppIDB>(DB_NAME, DB_VERSION, {
    upgrade(idb) {
      idb.createObjectStore(FAVORITE_MEAL_RECIPES_STORE_NAME, {
        keyPath: "id",
      });
    },
  });
}
