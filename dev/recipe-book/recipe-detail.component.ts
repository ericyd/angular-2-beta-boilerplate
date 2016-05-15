import {Component, OnInit} from 'angular2/core';
import {RouteParams, Router} from "angular2/router";
import {RecipeService} from "./recipe.service";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    templateUrl: 'templates/recipes/recipe-detail.tpl.html',
    providers: [ShoppingListService]
})

export class RecipeDetailComponent implements OnInit {
    recipe;
    private _recipeName: string;
    private _recipeIndex: number;

    constructor(private _routeParams: RouteParams, private _recipeService: RecipeService,
                private _router: Router, private _shoppingListService: ShoppingListService) {


    }

    onEdit() {
        this._router.navigate(['RecipeEdit', {'editMode': 'edit', 'recipeName': this._recipeName}]);
    }

    onDelete() {
        this._recipeService.deleteRecipe(+this._recipeIndex);
        this._router.navigate(['RecipeDetail']);
    }

    onAddToShoppingList() {
        this._shoppingListService.insertItems(this.recipe.ingredients);
    }


    ngOnInit():any {
        let itemName = this._routeParams.get('recipeName');
        // console.log(itemName);
        this._recipeName = itemName;
        this._recipeService.getSingleRecipe(this._recipeName !== null ? this._recipeName : null) || null;

        /* todo: figure out how to unsubscribe from this when the component is destroyed.
            Current behavior is that new subscription is started every time I navigate to this component.
            Would be better if the subscription was released when old component was destroyed.
            However, using this._recipeService.getReturnedData.unsubscribe throws a subscription error,
            even if it is placed in ngOnDestroy and the component implements OnDestroy
        */
        this._recipeService.getReturnedData().subscribe (
                data => {
                    this.recipe = data !== null ?  data : null;
                    console.log(this.recipe);
                },
                error => console.error(error)
            );
    }

}