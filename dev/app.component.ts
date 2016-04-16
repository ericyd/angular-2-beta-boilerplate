import {Component} from 'angular2/core';
import {InputComponent} from './bindings/input.component';
import {ConfirmComponent} from './bindings/confirm.component';

@Component({
    selector: 'my-app',

    template: `
        <div class='container'>
            <my-input (submitted)="onSubmit($event)" [myself]="confirmedMyself"></my-input>
        </div>
        
        <div class='container'>
            <my-confirm (confirmed)="onConfirm($event)" [myself]="myself"></my-confirm>
        </div>
        ConfirmedMyself:
        {{confirmedMyself.name}}<br>
        Myself:
        {{myself.name}}
    `,
    directives: [InputComponent, ConfirmComponent],
})

// TODO: figure out how to use Webstorm todo


export class AppComponent {
    myself = {name: '', age: ''};
    confirmedMyself = {name: '', age: ''};
    
    onSubmit(myself:{name:string, age:string}) {
        // for (let key in this.myself) {
        //     this.myself[key] = myself[key];
        // }
        
        
        this.myself = {"name": myself.name, "age":myself.age};
        
        
        // this.myself = myself;
    }
    
    onConfirm(myself:{name:string, age:string}) {
        // for (let key in this.confirmedMyself) {
        //     this.confirmedMyself[key] = myself[key];
        // }   
        
        this.confirmedMyself = {"name": myself.name, "age":myself.age};
        
        // this.confirmedMyself = myself;
    }
}
