import {Component, OnInit} from 'angular2/core';
import {Recipe} from "../shared/recipe.interface";
import {RouteParams, Router} from "angular2/router";
import {RecipeService} from "./recipe.service";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    templateUrl: 'templates/recipes/recipe-detail.tpl.html',
    providers: [ShoppingListService]
})

export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    private _recipeIndex: string;

    constructor(private _routeParams: RouteParams, private _recipeService: RecipeService,
                private _router: Router, private _shoppingListService: ShoppingListService) {}

    onEdit() {
        this._router.navigate(['RecipeEdit', {'editMode': 'edit', 'recipeIndex': this._recipeIndex}]);
    }

    onDelete() {
        this._recipeService.deleteRecipe(+this._recipeIndex);
        this._router.navigate(['RecipeDetail']);
    }

    onAddToShoppingList() {
        this._shoppingListService.insertItems(this.recipe.ingredients);
    }


    ngOnInit():any {
        let itemIndex = this._routeParams.get('recipeIndex');
        this._recipeIndex = itemIndex;
        this.recipe = this._recipeService.getSingleRecipe(itemIndex !== null ? +itemIndex : null) || null;

    }
}