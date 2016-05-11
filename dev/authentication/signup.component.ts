import {Component} from 'angular2/core';
import {User} from "../shared/user.interface";

@Component({
    template: `
        <form [ngFormModel]="myForm" (ngSubmit)="onSubmit(f.value)" #f="ngForm">
            
            <label for="email">Email</label>
            <input type="email" id="email" [ngControl]="email">
            
            <br>
            
            <label for="password">Password</label>
            <input type="text" id="password" [ngControl]="password">
            
            <br>
            
            <label for="confirmPassword">Password</label>
            <input type="text" id="confirmPassword" [ngControl]="confirmPassword">
            
            <br>
            
            <button type="submit">Submit</button>
        </form>
    `
})

export class Component {
    onSubmit(user: User) {
        
    }
}