import {Component} from 'angular2/core';
import {RecipesComponent} from "./recipe-book/recipes.component";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

@Component({
    
    selector: 'my-app',

    template: `
        <header>
            <nav>
                <ul>
                    <li><a [routerLink]="['Recipes']">Recipes</a></li>
                    <li><a [routerLink]="['ShoppingList']">Shopping List</a></li>
                    <li><a [routerLink]="['Signup']">Sign up</a></li>
                    <li><a [routerLink]="['Login']">Login</a></li>
                </ul>
            </nav>
        </header>
        <main class="main">
            <router-outlet></router-outlet>
        </main>
        
    `,
    directives: [ROUTER_DIRECTIVES]

})

@RouteConfig([
    {   // recall, the ellipsis allows for subrouting in this route
        path: '/recipes/...',
        name: 'Recipes',
        component: RecipesComponent,
        useAsDefault: true
    },
    {
        path: '/shopping-list',
        name: 'ShoppingList',
        component: ShoppingListComponent
    },
])

export class AppComponent {
    
}
