import {Component} from 'angular2/core';
import {Input} from 'angular2/core';

@Component({
    selector: 'property-binding2',
    template: `
        <h3>This is the child component</h3>
        Hey {{name}}, and I am {{age}}
    `,
    // input name must match what is coming from parent component that is sending data to this component
    // this uses aliases
    // before colon is the local variable name, after the colon is the name which is referred to outside this component
    // you can also use the @Input decorator, which is shown in the class definition
    inputs: ['name:myName']
    
})

export class PropertyBinding2Component {
    // this variable must match what is in the inputs
    name = "";
    // don't forget to import this decorator above!
    // add the alias to the argument of @Input
    @Input('myAge') age = 20;
}