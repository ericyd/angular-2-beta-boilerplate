/**
 * Created by eric on 5/6/16.
 */

import {Injectable} from 'angular2/core';
import {Recipe} from "../shared/recipe.interface";
import {RECIPES} from "../mock/recipes";

@Injectable()

export class RecipeService {
    getAllRecipes() {
        return RECIPES;
    }

    getSingleRecipe(index: number) {
        return RECIPES[index];
    }

    getIndexOfRecipe(item: Recipe) {
        return RECIPES.indexOf(item);
    }

    insertRecipe(item: Recipe) {
        return RECIPES.push(item);
    }

    deleteRecipe(index: number) {
        // return RECIPES.splice(RECIPES.indexOf(item), 1);
        return RECIPES.splice(index, 1);
    }

    updateRecipe(index: number, item: Recipe) {
        return RECIPES[index] = item;
    }
}