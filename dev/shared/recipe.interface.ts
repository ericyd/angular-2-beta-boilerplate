import {Ingredient} from "./ingredient.interface";
/**
 * Created by eric on 5/6/16.
 */

export class Recipe {
    name: string;
    content: string;
    imageUrl: string;
    ingredients: Ingredient[];
    id: string;

    constructor(name: string, content: string, imageUrl: string, ingredients: Ingredient[], id: string) {
        this.name = name;
        this.content = content;
        this.imageUrl = imageUrl;
        this.ingredients = ingredients;
        this.id = id;
    }
}