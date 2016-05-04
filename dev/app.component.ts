import {Component} from 'angular2/core';
import {TemplateDrivenFormComponent} from "./template-driven-form.component";
import {DataDrivenFormComponent} from "./data-driven-form.component";

@Component({
    
    selector: 'my-app',

    template: `
        <my-data-driven></my-data-driven>
        <br><br><br><br>
        <my-template-driven></my-template-driven>
        
    `,
    directives: [TemplateDrivenFormComponent, DataDrivenFormComponent]
})



export class AppComponent {
    
}
