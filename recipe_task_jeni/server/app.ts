import { customerRouter } from './table/customerpage';
import {  ingredientsRouter} from './table/ingredientpage'
import {receipesRouter } from './table/reciepepage'
import { router } from './trpc';
// import { recipeIngredientRouter } from './table/RecipeIngredient';

export const appRouter = router({ 
  customer:customerRouter,
  ingredients:ingredientsRouter,
  receipes:receipesRouter,
  // recipeIngredients: recipeIngredientRouter,
});
 

 
export type AppRouter = typeof appRouter;