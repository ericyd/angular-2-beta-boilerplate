/* naming convention:
<componentname>.component.ts
*/

// this enables us to use the Component declarator (decorator?)
import {Component} from 'angular2/core';
import {TestComponent} from './test.component';
import {OnInit} from 'angular2/core';

// creating a JS object inside the component
@Component({
    // selector should reflect name of component
    selector: 'my-component',
    // refers to properties in the class MyComponentComponent
    // #localvariable creates a local variable with the name after the hashtag
    // this variable becomes bound to the element in which it is declared
    template: `
        Hi, I'm <span [style.color]="inputElement.value === 'yes' ? 'red' : ''">{{name}}</span> and this is my very first Angular 2 component. <span [class.is-awesome]="inputElement.value === 'yes'">It's so awesome!</span>
        <br>
        <br>
        Is it awesome?
        <input type="text" #inputElement (keyup)="0">
        <br>
        <br>
        <button [disabled]="inputElement.value !== 'yes'">Only enabled if 'yes' was entered</button>
        <test></test>
    `,
    styleUrls: ['src/css/mycomponent.css'],
    directives: [TestComponent],
})

// named <componentname>Component
// implements the interface OnInit (imported above)
export class MyComponentComponent implements OnInit {
    name: string;
    
    // this works, but not what we want to do
    /*
    constructor() {
        this.name = "Eric";
    }
    */
    
    // We will use a "lifecycle hook" OnInit
    // we must implement the method ngOnInit() required by OnInit
    ngOnInit():any {
        this.name = "Eric";
    }
    
}