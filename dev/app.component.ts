import {Component} from 'angular2/core';
import {StringInterpolationComponent} from './string-interpolation.component';
import {PropertyBindingComponent} from './property-binding.component';
import {EventBindingComponent} from './event-binding.component';

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
        <string-interpolation></string-interpolation>
        <property-binding></property-binding>
        <event-binding></event-binding>
    `,
    directives: [StringInterpolationComponent, PropertyBindingComponent, EventBindingComponent]
})



export class AppComponent {

}
