import {Component} from 'angular2/core';

@Component({
    selector: 'event-binding',
    template: `
        <br><br><br><br>
        Bind data from events
        Create log of all history of inputted characters from input field<br><br>
        <input type="text" (keyup)="onKeyUp(inputEl.value)" #inputEl>
        <p>{{values}}</p>
    `
})

export class EventBindingComponent {
    values = '';
    
    onKeyUp(value: string) {
        this.values += value + ' | ';
    }
}