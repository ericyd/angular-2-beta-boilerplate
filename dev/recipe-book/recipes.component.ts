import {Component} from '@angular/core';
import {RecipeListComponent} from "./recipe-list.component";
import {RecipeService} from "./recipe.service";
import {ROUTER_DIRECTIVES, Routes} from "@angular/router";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {RecipeEditComponent} from "./recipe-edit.component";

@Component({
    selector: 'my-recipes',
    template: `
        <div class="master list">
            <my-recipe-list></my-recipe-list>
        </div>
        
        <div class="detail">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [RecipeListComponent, ROUTER_DIRECTIVES],
    providers: [RecipeService]
})

@Routes([
    {
        path: '/',
        component: RecipeDetailComponent,
    },
    {
        path: '/edit/:editMode',
        component: RecipeEditComponent
    },
])

export class RecipesComponent {

}