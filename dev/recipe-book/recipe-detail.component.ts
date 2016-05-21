import {Component, OnInit} from '@angular/core';
import {RouteSegment, Router} from "@angular/router";
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

    constructor(private _routeSegment: RouteSegment, private _recipeService: RecipeService,
                private _router: Router, private _shoppingListService: ShoppingListService) {
    }

    onEdit() {
        this._router.navigate(['edit', 'edit', this._recipeId]);
    }

    onDelete() {
        this._recipeService.deleteRecipe(this._recipeId)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );

        this._recipeService.clearCurrentRecipe();

        this._router.navigate(['./']);
    }

    onAddToShoppingList() {
        this._shoppingListService.insertItems(this.recipe.ingredients);
    }


    ngOnInit():any {

        this._recipeId = this._routeSegment.getParam('recipeId');
        
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