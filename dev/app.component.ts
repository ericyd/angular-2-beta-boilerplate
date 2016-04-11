import {Component} from 'angular2/core';
// note local folder notation ./ at beginning of string
import {MyComponentComponent} from './my-component.component';

@Component({
    // this is how we embed this component in html.  It inserts the "template" instead of the directive/component tag.  We do this with
    // <my-app></my-app>
    selector: 'my-app',
    /* contains the html to insert for this component.
    Can also be imported from external html file using templateUrl
    Note: `` denote a multi-line string in TS.
    All other components must live inside this component.  
    */
    template: `
        <h1>Angular 2 Boilerplate</h1>
        <p>Hello World! yeah! THis is cool</p>
        <my-component></my-component>
    `,
    /* 
    We must tell our AppComponent how to find my-component
    We do so with directives.  Recall: all components are directives, just a special type.
    Also must be imported at top!! 
    */
    directives: [MyComponentComponent]
})



export class AppComponent {

}
