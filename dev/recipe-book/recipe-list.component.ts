import {Component, OnInit} from 'angular2/core';
import {RecipeService} from "./recipe.service";
import {Recipe} from "../shared/recipe.interface";
import {Router} from "angular2/router";

@Component({
    selector: 'my-recipe-list',
    template: `
    <button class="btn" (click)="onAddRecipe()">Add recipe</button>
    <ul>
        <li *ngFor="#item of recipes" (click)="onSelect(item)">
            <div class="img">
                <img [src]="item.imageUrl" alt="{{item.name}}">
            </div>            
            <div class="text">{{item.name}}</div>
        </li>
    </ul>
    `
})

export class RecipeListComponent implements OnInit{
    count = 0;
    recipes: Recipe[];

    constructor(private _recipeService: RecipeService, private _router: Router) {}

    onSelect(item: Recipe) {
        // todo: fix getIndexOfRecipe so that it queries the right object.
        // console.log(item.name);
        this._router.navigate(['RecipeDetail', {'recipeId': item.id}]);
    }

    onAddRecipe() {
        this._router.navigate(['RecipeEdit', {'editMode': 'create'}]);
    }

    ngOnInit():any {
        // todo: don't download all data, just download recipe names and imageUrls (and maybe IDs?)  Then, when querying a specific recipe, I can just call the one I need rather than downloading the whole dataset to begin with
        let recipes = [];

        // initialize the firebase listener
        this._recipeService.getAllRecipes();

        // listen for changes and update recipes on changes
        this._recipeService.listen()
            .subscribe(
                data => {
                    this.recipes = [];
                    console.log('got update');
                    Object.keys(data).forEach(recipeId => {
                        this.recipes.push(new Recipe(
                            data[recipeId].name,
                            data[recipeId].content,
                            data[recipeId].imageUrl,
                            data[recipeId].ingredients,
                            recipeId
                        ));
                    });
                },
                error => console.error(error)
            );

        this.recipes = recipes;
    }
}