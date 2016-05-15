import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from "angular2/router";
import {RecipeService} from "./recipe.service";
import {ShoppingListService} from "../shared/shopping-list.service";
import {Recipe} from "../shared/recipe.interface";

@Component({
    templateUrl: 'templates/recipes/recipe-detail.tpl.html',
    providers: [ShoppingListService]
})

export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    private _recipeId: string;

    constructor(private _routeParams: RouteParams, private _recipeService: RecipeService,
                private _router: Router, private _shoppingListService: ShoppingListService) {
    }

    onEdit() {
        this._router.navigate(['RecipeEdit', {'editMode': 'edit', 'recipeId': this._recipeId}]);
    }

    onDelete() {
        this._recipeService.deleteRecipe(this._recipeId)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );

        this._recipeService.clearCurrentRecipe();

        this._router.navigate(['RecipeDetail']);
    }

    onAddToShoppingList() {
        this._shoppingListService.insertItems(this.recipe.ingredients);
    }


    ngOnInit():any {

        let itemId = this._routeParams.get('recipeId');

        this._recipeId = itemId;
        this._recipeService.getSingleRecipe(this._recipeId).then(
            (resolve) => {
                this.recipe = resolve;
            },
            (reject) => {
                console.log(reject);
                this.recipe = null;
            });

    }

}