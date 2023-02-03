import type { QueryFunctionContext } from "react-query";

interface UnformattedData {
  [key: string]: any;
}

export interface MealRecipe {
  id: string;
  area: string;
  category: string;
  ingredients: string[];
  measures: string[];
  instructions: string[];
  name: string;
  thumbnail: string;
  source: string;
  youtube: string;
}

interface MealRecipeCategory {
  name: string;
}

interface MealRecipeArea {
  name: string;
}

const API_KEY = "1";

const API_ENDPOINT = `https://www.themealdb.com/api/json/v1/${API_KEY}`;

export function transformUnformattedMealRecipe(
  unformattedMealRecipe: UnformattedData
) {
  const mealRecipe: MealRecipe = {
    id: "",
    area: "",
    category: "",
    name: "",
    thumbnail: "",
    source: "",
    youtube: "",
    instructions: [],
    ingredients: [],
    measures: [],
  };

  Object.entries(unformattedMealRecipe).forEach(([key, value]) => {
    if (key === "idMeal") {
      mealRecipe.id = value;
    } else if (key === "strArea") {
      mealRecipe.area = value;
    } else if (key === "strCategory") {
      mealRecipe.category = value;
    } else if (key === "strMeal") {
      mealRecipe.name = value;
    } else if (key === "strMealThumb") {
      mealRecipe.thumbnail = value;
    } else if (key === "strSource") {
      mealRecipe.source = value;
    } else if (key === "strYoutube") {
      mealRecipe.youtube = value;
    } else if (key === "strInstructions") {
      mealRecipe.instructions = value
        .split(/\n/g)
        .filter((instruction: string) => instruction.trim() !== "");
    } else if (key.startsWith("strIngredient")) {
      const [order] = key.match(/\d+$/g)!;
      const index = parseInt(order) - 1;

      if (value !== "" || value !== null) {
        mealRecipe.ingredients[index] = value;
      }
    } else if (key.startsWith("strMeasure")) {
      const [order] = key.match(/\d+$/g)!;
      const index = parseInt(order) - 1;

      if (value !== "" || value !== null) {
        mealRecipe.measures[index] = value;
      }
    }
  });

  mealRecipe.ingredients = mealRecipe.ingredients.filter(
    (ingredient) => ingredient?.trim() !== "" && ingredient !== null
  );

  mealRecipe.measures = mealRecipe.measures.filter(
    (measure) => measure?.trim() !== "" && measure !== null
  );

  return mealRecipe;
}

export function transformUnformattedMealRecipeCategory(
  unformattedMealRecipeCategory: UnformattedData
) {
  const mealRecipeCategory: MealRecipeCategory = {
    name: "",
  };

  Object.entries(unformattedMealRecipeCategory).forEach(([key, value]) => {
    if (key === "strCategory") {
      mealRecipeCategory.name = value;
    }
  });

  return mealRecipeCategory;
}

export function transformUnformattedMealRecipeArea(
  unformattedMealRecipeArea: UnformattedData
) {
  const mealRecipeArea: MealRecipeArea = {
    name: "",
  };

  Object.entries(unformattedMealRecipeArea).forEach(([key, value]) => {
    if (key === "strArea") {
      mealRecipeArea.name = value;
    }
  });

  return mealRecipeArea;
}

export async function getMealRecipeQuery(
  id: MealRecipe["id"],
  context: QueryFunctionContext
): Promise<MealRecipe> {
  const response = await fetch(`${API_ENDPOINT}/lookup.php?i=${id}`, {
    signal: context.signal,
  });

  const unformattedData = await response.json();

  return transformUnformattedMealRecipe(unformattedData.meals[0]);
}

export async function getRandomMealRecipeQuery(context: QueryFunctionContext) {
  const response = await fetch(`${API_ENDPOINT}/random.php`, {
    signal: context.signal,
  });

  const unformattedData = await response.json();

  return transformUnformattedMealRecipe(unformattedData.meals[0]);
}

export async function getAllMealRecipesByNameQuery(
  name: MealRecipe["name"],
  context: QueryFunctionContext
): Promise<MealRecipe[]> {
  const response = await fetch(`${API_ENDPOINT}/search.php?s=${name}`, {
    signal: context.signal,
  });

  const unformattedData = await response.json();

  return unformattedData.meals.map(transformUnformattedMealRecipe);
}

export async function getAllMealRecipesByCategoryQuery(
  category: MealRecipe["category"],
  context: QueryFunctionContext
): Promise<MealRecipe[]> {
  const response = await fetch(`${API_ENDPOINT}/filter.php?c=${category}`, {
    signal: context.signal,
  });

  const unformattedData: UnformattedData = await response.json();

  const mealRecipes = await Promise.all(
    unformattedData.meals.map(async (data: any) => {
      const mealRecipe = await getMealRecipeQuery(data.idMeal, context);

      return mealRecipe;
    })
  );

  return mealRecipes;
}

export async function getAllMealRecipesByAreaQuery(
  area: MealRecipe["area"],
  context: QueryFunctionContext
): Promise<MealRecipe[]> {
  const response = await fetch(`${API_ENDPOINT}/filter.php?a=${area}`);

  const unformattedData: UnformattedData = await response.json();

  const mealRecipes = await Promise.all(
    unformattedData.meals.map(async (data: any) => {
      const mealRecipe = await getMealRecipeQuery(data.idMeal, context);

      return mealRecipe;
    })
  );

  return mealRecipes;
}

export async function searchMealRecipesQuery(
  {
    name,
    category,
    area,
  }: {
    name?: MealRecipe["name"];
    category?: MealRecipe["category"];
    area?: MealRecipe["area"];
  },
  context: QueryFunctionContext
) {
  let mealRecipes: MealRecipe[] = [];

  if (name !== undefined) {
    const mealRecipesWithSpecifiedName = await getAllMealRecipesByNameQuery(
      name,
      context
    );

    mealRecipes = mealRecipes.concat(mealRecipesWithSpecifiedName);
  }

  if (category !== undefined) {
    const mealRecipesWithSpecifiedCategory =
      await getAllMealRecipesByCategoryQuery(category, context);

    mealRecipes = mealRecipes.concat(mealRecipesWithSpecifiedCategory);
  }

  if (area !== undefined) {
    const mealRecipesWithSpecifiedArea = await getAllMealRecipesByAreaQuery(
      area,
      context
    );

    mealRecipes = mealRecipes.concat(mealRecipesWithSpecifiedArea);
  }

  return mealRecipes.reduce<MealRecipe[]>((accumulator, currentValue) => {
    const isDuplicate = accumulator.find(({ id }) => id === currentValue.id);

    if (isDuplicate) {
      console.log("DUPLICATEEE");
      return accumulator;
    }

    const hasSpecifiedName =
      name === undefined
        ? true
        : currentValue.name.toLowerCase().includes(name.toLowerCase());

    const hasSpecifiedCategory =
      category === undefined
        ? true
        : currentValue.category.toLowerCase() === category.toLowerCase();

    const hasSpecifiedArea =
      area === undefined
        ? true
        : currentValue.area.toLowerCase() === area.toLowerCase();

    if (hasSpecifiedName && hasSpecifiedCategory && hasSpecifiedArea) {
      return [...accumulator, currentValue];
    }

    return accumulator;
  }, []);
}

export async function getMealRecipeCategoriesQuery(
  context: QueryFunctionContext
): Promise<MealRecipeCategory[]> {
  const response = await fetch(`${API_ENDPOINT}/list.php?c=list`, {
    signal: context.signal,
  });

  const unformattedData = await response.json();

  return unformattedData.meals.map(transformUnformattedMealRecipeCategory);
}

export async function getMealRecipeAreasQuery(
  context: QueryFunctionContext
): Promise<MealRecipeArea[]> {
  const response = await fetch(`${API_ENDPOINT}/list.php?a=list`, {
    signal: context.signal,
  });

  const unformattedData = await response.json();

  return unformattedData.meals.map(transformUnformattedMealRecipeArea);
}
