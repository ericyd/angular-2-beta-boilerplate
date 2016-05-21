import {Component, OnInit} from '@angular/core';
import {RecipesComponent} from "./recipe-book/recipes.component";
import {Routes, ROUTER_DIRECTIVES, Router} from "@angular/router";
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
                    <li><a [routerLink]="['recipes']">Recipes</a></li>
                    <li><a [routerLink]="['shopping-list']">Shopping List</a></li>
                    <li *ngIf="!isAuth()"><a [routerLink]="['signup']">Sign up</a></li>
                    <li *ngIf="!isAuth()"><a [routerLink]="['login']">Login</a></li>
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

@Routes([
    {   // recall, the ellipsis allows for subrouting in this route
        path: '/recipes',
        component: RecipesComponent
    },
    {
        path: '/shopping-list',
        component: ShoppingListComponent
    },
    {
        path: '/signup',
        component: SignupComponent
    },
    {
        path: '/login',
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
        this._authService.getLogoutEvent().subscribe(() => this._router.navigate(['recipes']));
    }
}
