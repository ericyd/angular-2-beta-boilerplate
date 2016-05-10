import {Component} from 'angular2/core';
import {RecipeListComponent} from "./recipe-list.component";
import {RecipeService} from "./recipe.service";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
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

@RouteConfig([
    {
        path: '/',
        name: 'RecipeDetail',
        component: RecipeDetailComponent,
        useAsDefault: true
    },
    {
        path: '/:editMode',
        name: 'RecipeEdit',
        component: RecipeEditComponent
    },
])

export class RecipesComponent {

}