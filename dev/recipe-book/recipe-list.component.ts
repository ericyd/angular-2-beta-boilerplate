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
        this._router.navigate(['RecipeDetail', {'recipeName': item.name}]);
    }

    onAddRecipe() {
        this._router.navigate(['RecipeEdit', {'editMode': 'create'}]);
    }

    ngOnInit():any {
        // todo: don't download all data, just download recipe names and imageUrls (and maybe IDs?)  Then, when querying a specific recipe, I can just call the one I need rather than downloading the whole dataset to begin with
        let recipes = [];
        this._recipeService.getAllRecipes()
            .subscribe(
                data => {
                    Object.keys(data).forEach(userId => {
                        recipes.push(new Recipe(
                            data[userId].name,
                            data[userId].content,
                            data[userId].imageUrl,
                            data[userId].ingredients
                        ));
                    });
                },
                error => console.error(error)
            );


        

        this.recipes = recipes;
    }
}