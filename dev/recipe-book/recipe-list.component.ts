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
    recipes: Recipe[];

    constructor(private _recipeService: RecipeService, private _router: Router) {}

    onSelect(item: Recipe) {
        this._router.navigate(['RecipeDetail', {'recipeIndex': this._recipeService.getIndexOfRecipe(item)}]);
    }

    onAddRecipe() {
        this._router.navigate(['RecipeEdit', {'editMode': 'create'}]);
    }

    ngOnInit():any {
        this.recipes = this._recipeService.getAllRecipes();
    }
}