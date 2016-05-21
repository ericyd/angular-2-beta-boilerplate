import {Component, OnInit} from '@angular/core';
import {RecipeService} from "./recipe.service";
import {Recipe} from "../shared/recipe.interface";
import {Router} from "@angular/router";

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
    recipes: Recipe[];

    constructor(private _recipeService: RecipeService, private _router: Router) {}

    onSelect(item: Recipe) {
        this._router.navigate(['./', item.id]);
    }

    onAddRecipe() {
        this._router.navigate(['edit', 'create']);
    }

    ngOnInit():any {
        // todo: don't download all data, just download recipe names and imageUrls (and maybe IDs?)  Then, when querying a specific recipe, I can just call the one I need rather than downloading the whole dataset to begin with
        console.log('init recipe list');
        // initialize the firebase listener
        this.recipes = this._recipeService.getAllRecipes();

        // listen for changes and update recipes on changes
        this._recipeService.listen()
            .subscribe(
                data => {
                    this.recipes = [];
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

        // this.recipes = recipes;
    }
}