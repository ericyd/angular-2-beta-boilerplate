import {Component} from 'angular2/core';
import {Router, CanDeactivate, ComponentInstruction} from "angular2/router";

@Component({
    template: `
        <h2>Component 2</h2>
        <button (click)="onNavigate()">Take me to component 1</button>
    `
})

export class Component2Component implements CanDeactivate{

    // in order to programmatically route, you must inject the router
    constructor (private _router: Router) {}

    onNavigate() {
        //The array that is passed here is the same as the array passed in the routerLink property binding
        this._router.navigate(['Component1', {'source':'Component2'}])
    }

    // return true: yes we can navigate away
    // return false: no we cannot navigate away
    routerCanDeactivate(nextInstruction: ComponentInstruction, previousInstruction: ComponentInstruction):any {
        return confirm('Are you sure?');
    }
}