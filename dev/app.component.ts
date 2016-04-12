import {Component} from 'angular2/core';
import {InputComponent} from './bindings/input.component';

@Component({
    selector: 'my-app',

    template: `
        <div class='container'>
            <my-input (submitted)="onSubmit($event)"></my-input>
        </div>
        
        <div class='container'>
            {{myself.name}} {{myself.age}}
        </div>
    `,
    directives: [InputComponent],
})


 
export class AppComponent {
    myself = {name: '', age: ''};
    confirmedMyself = {name: '', age: ''};
    
    onSubmit(myself:any) {
        for (let key in this.myself) {
            this.myself[key] = myself[key];
        }
    }
}
