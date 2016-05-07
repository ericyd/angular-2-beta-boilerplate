import {Component} from 'angular2/core';
import {RecipesComponent} from "./recipe-book/recipes.component";
import {RouteConfig} from "angular2/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";

@Component({
    
    selector: 'my-app',

    template: `
        <header>
            <nav>
                <ul>
                    <li><a>Recipes</a></li>
                    <li><a>Shopping List</a></li>
                </ul>
            </nav>
        </header>
        <main class="main">
            <my-recipes></my-recipes>
        </main>
        
    `,
    directives: [RecipesComponent]
})

@RouteConfig([
    {
        path: '/recipes',
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
