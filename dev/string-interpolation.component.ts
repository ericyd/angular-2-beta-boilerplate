import {Component} from 'angular2/core';

@Component({
    selector: "string-interpolation",
    template: `
        Basic idea: bind data text on the page.
        <br>
        Type 1: {{'direct enter a string'}} - Direct enter a string
        <br>
        Type 2: {{1 === 1}} - Enter a logical expression 
        <br>
        Type 3: {{property}} - bind to property in class
        <br>
        Type 4: {{onTest()}} - bind to return value from formula
        <br>
        Type 5: {{inputEl.value}} - bind to local variable
        <input type="text" #inputEl value="{{property}}">
        <br>
        Other ideas: in classes, e.g. <span class="{{'some-class'}}">bold text</span>
    `
})

export class StringInterpolationComponent {
    property = "Test Property";
    
    onTest():number {
        return 1 === 1 ? 4 : 3;
    }
}