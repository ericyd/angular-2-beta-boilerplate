import {Component} from 'angular2/core';

@Component({
    selector: 'two-way-databinding',
    template: `
        <br><br><br>
        Combine property binding and event binding syntax to have two way data binding.
        Property binding binds data <i>into</i> the el.
        Event binding binds data <i>out</i> of the el.
        MUST use the ngModel directive for two-way databinding<br><br>
        <input type="text" [(ngModel)]="name">
        <br>
        <p>Your name is {{name}}</p>
        Note: this doesn't update the other "name" interpolation in other components, because the data from this component is 
        separate from the other components
    `
})

export class TwoWayDatabindingComponent {
    name = "eric";
}