import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Component1Component} from "./component1.component";
import {Component2Component} from "./component2.component";

@Component({

    selector: 'my-app',

    template: `
        <header>
            <h1>Header <small>(optional)</small></h1>
            <ul>
                <li>
                    <!--array[0]=name, array[1]=args-->
                    <a [routerLink]="['Component1', {'source':'AppComponent', 'optional': 'true dat'}]">Component1</a>    
                </li>
                <li>
                    <a [routerLink]="['Component2']">Component2</a>
                </li>
            </ul>
        </header>
        <!--Only one router-outlet allowed per file-->
        <router-outlet></router-outlet>
    `,
    // Required for routes to work
    directives: [ROUTER_DIRECTIVES]
})

/*This route contains all the routes we'd like to register within the component.\
 * These are the main entry points to the application.
 * Each path is a JSON object
 * */
@RouteConfig([
    {
        //Adding a colon after the path names the parameter for the route
        // optional parameters are simply not specified here, but still passed int he JSON object.
        path: '/component-1/:source/...',
        name: 'Component1',
        component: Component1Component,
        // useAsDefault: true
    },
    {
        path: '/component-2',
        name: 'Component2',
        component: Component2Component
    },

])

export class AppComponent {

}
