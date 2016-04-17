import {Component} from 'angular2/core';
import {AttributeDirectives} from "./attribute-directives.component";
import {StructuralDirectives} from "./structural-directives.component";

@Component({
    
    selector: 'my-app',

    template: `
        <h1>Attribute Directives</h1>
        <my-attribute-directives></my-attribute-directives>
        <br><br>
        <h1>Structural Directives</h1>
        <my-structural-directives></my-structural-directives>
    `,
    directives: [AttributeDirectives, StructuralDirectives]
})
    


export class AppComponent {
    
}
