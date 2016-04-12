import {Component} from 'angular2/core';

@Component({
    selector: 'property-binding',
    template: `
        <br><br><br>
        Basic idea: bind data to a property instead of binding data to text on the page.  Data flow <i>into</i> something
        <br>
        Type 1: bind to a property of an element.  Below, binding to the "value" of the element<br>
        <input type="text" [value]="name">
        <input type="text" [value]="1===1">
        <input type="text" [disabled]="1===1">
        <br><br>
        Type 2: bind to a property of a directive.<br>
        <input type="text" [value]="1===1" [ngClass]="{red: true}">
        <br>
        Type 3: send data to a directive, e.g.
        <my-component [aValue]="sample-data"></my-component>
        
        
    `
})

export class PropertyBindingComponent {
    name = "eric";
}