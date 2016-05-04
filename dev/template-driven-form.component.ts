import {Component} from 'angular2/core';

@Component({
    selector: 'my-template-driven',
    /*Angular2 auto-adds the `ngForm` directive to any form tags
    * However, we must tell Angular what the input elements are with `ngControl`.
     * Only elements with ngControl will be considered by Angular2 with validation.
     * The form acts as a __group of controls__.
     * Note: binding #f="ngForm" allows us to bind the local variable to a reference of the form.
     * */
    template: `
        <h1>Template Driven Form</h1>
        <h2>Sign up form</h2>
        <form (ngSubmit)="onSubmit(f)" #f="ngForm">
            <div>
                <label for="mail">Mail</label>
                <input ngControl="email" type="text" id="mail" required #email="ngForm">
                <span class="validation-error" *ngIf="!email.valid">Not Valid</span>
            </div>
            
            <div>
                <label for="password">Password</label>
                <input ngControl="password" type="text" id="password" required #password="ngForm">
                <span class="validation-error" *ngIf="!password.valid">Not Valid</span>
            </div>
            
            <div>
                <label for="confirmedPassword">Confirm Password</label>
                <input ngControl="confirmedPassword" type="text" id="confirmedPassword" required #confirmedPassword="ngForm">
                <span class="validation-error" *ngIf="!confirmedPassword.valid">Not Valid</span>
            </div>
            
            <button type="submit" [disabled]="!f.valid || password.value !== confirmedPassword.value">Submit</button>
        </form>
        
        <div *ngIf="user.email !== '' && user.password !== ''">
            <h2>You submitted</h2>
            <div>
                Email: {{user.email}}
            </div>
            <div>
                Password: {{user.password}}
            </div>
        </div>
    `
})

export class TemplateDrivenFormComponent {
    user = {email: '', password: ''};

    onSubmit(form) {
        this.user.email = form.value["email"];
        this.user.password = form.controls.password.value;
        console.log(form.value);
        /*Access specific elements with
        * form.value.email
        * form.value.password
        * form.value.confirmedPassword
        *
        * form.controls gives access to more attributes of the control elements
        * */
    }

}