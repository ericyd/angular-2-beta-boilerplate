import {Component, OnInit} from 'angular2/core';
import {RecipesComponent} from "./recipe-book/recipes.component";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {SignupComponent} from "./authentication/signup.component";
import {LoginComponent} from "./authentication/login.component";
import {AuthService} from "./shared/auth.service";

@Component({
    
    selector: 'my-app',

    template: `
        <header>
            <nav>
                <ul>
                    <li><a [routerLink]="['Recipes']">Recipes</a></li>
                    <li><a [routerLink]="['ShoppingList']">Shopping List</a></li>
                    <li *ngIf="!isAuth()"><a [routerLink]="['Signup']">Sign up</a></li>
                    <li *ngIf="!isAuth()"><a [routerLink]="['Login']">Login</a></li>
                    <li *ngIf="isAuth()"><a (click)="logout()">Logout</a></li>
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
    {
        path: '/signup',
        name: 'Signup',
        component: SignupComponent
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    }
])

export class AppComponent implements OnInit {
    constructor(private _authService: AuthService, private _router: Router) {}

    isAuth(): boolean {
        return this._authService.isAuthenticated();
    }

    logout() {
        return this._authService.logout();
    }
    
    ngOnInit(): any {
        this._authService.getLogoutEvent().subscribe(() => this._router.navigate(['Recipes']));
    }
}
