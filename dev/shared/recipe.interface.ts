import {Ingredient} from "./ingredient.interface";
/**
 * Created by eric on 5/6/16.
 */

export class Recipe {
    name: string;
    content: string;
    imageUrl: string;
    ingredients: Ingredient[];

    constructor(name: string, content: string, imageUrl: string, ingredients: Ingredient[]) {
        this.name = name;
        this.content = content;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
    }
}