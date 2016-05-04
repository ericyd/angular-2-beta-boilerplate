import {Component, OnInit} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators} from "angular2/common";
import {hasNumbers, NumberValidator} from "./hasNumbers.validator";

@Component({
    selector: 'my-data-driven',
    /*
        ngFormModel forces Angular2 to use the property myForm, defined in the class.
        ngFormControl tells the form which element goes to which control
     * */
    template: `
        <h1>Data Driven Form</h1>
        <h2>Sign up form</h2>
        <form [ngFormModel]="myForm" (ngSubmit)="onSubmit()">
            <div>
                <label for="mail">Mail</label>
                <input [ngFormControl]="myForm.controls['email']" type="text" id="mail" #email="ngForm">
                <span class="validation-error" *ngIf="!email.valid">Not Valid</span>
            </div>
            
            <div>
                <label for="password">Password</label>
                <input [ngFormControl]="myForm.controls.password" type="text" id="password" #password="ngForm">
                <span class="validation-error" *ngIf="!password.valid" >Not Valid</span>
            </div>
            
            <div>
                <label for="confirmedPassword">Confirm Password</label>
                <input [ngFormControl]="myForm.controls['confirmedPassword']" type="text" id="confirmedPassword" #confirmedPassword="ngForm">
                <span class="validation-error"  *ngIf="!confirmedPassword.valid">Not Valid</span>
            </div>
            
            <button type="submit" [disabled]="!myForm.valid || password.value !== confirmedPassword.value">Submit</button>
        </form>
        
        <div *ngIf="myForm.valid && password.value === confirmedPassword.value">
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

export class DataDrivenFormComponent implements OnInit{
    myForm: ControlGroup;
    user = {email: '', password: ''};

    constructor (private _formBuilder: FormBuilder) {}

    onSubmit() {
        console.log(this.myForm);
        this.user = this.myForm.value;
    }

    ngOnInit():any {
        // This builds a control group
        this.myForm = this._formBuilder.group({
            // first value: default
            // second value: validation logic
            // NOTE: the reason we don't call the method with () is because we just want to provide a path to the mthod,
            // not call it right here in the code
            'email': ['', Validators.required],
            // The compose method gets an array of all the validators that I want to use on this field
            'password': ['', Validators.compose([
                Validators.required,
                NumberValidator.hasNumbers
            ])]
            'confirmedPassword': ['', Validators.required]
        });
    }

}