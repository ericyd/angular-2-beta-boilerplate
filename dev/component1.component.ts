import {Component, OnInit} from 'angular2/core';
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {Comp1MainComponent} from "./comp1-main.component";
import {Comp1SubComponent} from "./comp1-sub.component";

@Component({
    template: `
        Template1, comnponent 1
        <div>
            Source was {{source}}
            
        </div>
        <div>
            Optional was {{optional}}
            
        </div>
        <div>
            <ul>
                <li>
                    <!--array[0]=name, array[1]=args-->
                    <a [routerLink]="['Component1Main']">Component1Main</a>    
                </li>
                <li>
                    <a [routerLink]="['Component1Sub']">Component1Sub</a>
                </li>
            </ul>
        </div>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    // paths are relative from component that the path is defined in
    {
        path: '/',
        name: 'Component1Main',
        component: Comp1MainComponent,
        useAsDefault: true
    },
    {
        path: '/sub',
        name: 'Component1Sub',
        component: Comp1SubComponent

    },
])

export class Component1Component implements OnInit{
    source: string;
    optional: string;
    //RouteParams allows you to access the params passed to a route
    constructor(private _routeParams: RouteParams) {}

    ngOnInit():any {
        this.source = this._routeParams.get('source');
        this.optional = this._routeParams.get('optional');
    }
}