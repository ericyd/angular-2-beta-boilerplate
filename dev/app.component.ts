import {Component} from 'angular2/core';
import {StringInterpolationComponent} from './string-interpolation.component';
import {PropertyBindingComponent} from './property-binding.component';
import {EventBindingComponent} from './event-binding.component';
import {TwoWayDatabindingComponent} from './two-way-databinding.component';
import {PropertyBinding2Component} from './property-binding2.component';

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
        
        <section class="parent">
        <h1>Property Binding 2 (in parent component)</h1>
            <h4> Please enter your name</h4>
            <input type="text" [(ngModel)]="name">
            <br><br>
            <section class="child">
                <property-binding2 
                [myName]="name" 
                [myAge]="26"
                (hobbiesChanged)="hobbies = $event"></property-binding2>
            </section>
        </section>
        
        <p>My hobbies are {{hobbies}}</p>
            
        
        
        <h1>String Interpolation</h1>
        <string-interpolation></string-interpolation>
        <h1>Property Binding 1</h1>
        <property-binding></property-binding>
        <h1>Event binding</h1>
        <event-binding></event-binding>
        <h1>Two way data binding</h1>
        <two-way-databinding></two-way-databinding>
    `,
    directives: [StringInterpolationComponent, PropertyBindingComponent, EventBindingComponent, TwoWayDatabindingComponent, PropertyBinding2Component]
})



export class AppComponent {
    name = '';
    hobbies = '';
}
