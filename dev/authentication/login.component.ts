import {Component} from 'angular2/core';

@Component({
    template: `
        <h3>Login</h3>
        <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()">
            
            <label for="email">Email</label>
            <input type="email" id="email" [ngFormControl]="myForm.find('email')" #email="ngForm">
            
            <br>
            
            <label for="password">Password</label>
            <input type="password" id="password" [ngFormControl]="myForm.find('password')" #password="ngForm">
            
            <br>
            
            <label for="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" [ngFormControl]="myForm.find('confirmPassword')" #confirmPassword="ngForm">
            
            <br>
            
            <button type="submit">Submit</button>
        </form>
        
        <section *ngIf="signupError">
            Error signing up
        </section>
    `
})

export class LoginComponent {
    title: string = "Login";
    error: boolean = false;
    
}