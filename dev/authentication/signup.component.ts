import {Component, OnInit} from 'angular2/core';
import {User} from "../shared/user.interface";
import {AuthService} from "../shared/auth.service";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";

@Component({
    template: `
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
        
        <section *ngIf="error">
            Error signing up
        </section>
    `
})

export class SignupComponent implements OnInit {
    myForm: ControlGroup;
    error: boolean = false;


    constructor(private _authService: AuthService, private _fb: FormBuilder) {}
    
    onSubmit() {
        this._authService.signupUser(this.myForm.value);
    }
    
    onSignupError(): boolean {
        this.error = this._authService.getSignupError();
    }

    ngOnInit(): any {
        this.myForm = this._fb.group({
            'email': ['', Validators.compose([
                Validators.required
            ])],
            'password': ['', Validators.compose([
                Validators.required,
                this.largerThanFive,
                this.lettersAndNumbers

            ])],
            'confirmPassword': ['', Validators.compose([
                Validators.required,
                this.isSamePassword.bind(this)
            ])]
        })
    }



    isSamePassword(control: Control): {[s: string]: boolean} {
        if (!this.myForm) {
            return {'formNotComplete': true};
        }

        if (control.value !== this.myForm.controls['password'].value) {
            return {'passwordsDoNotMatch': true};
        }
    }

    largerThanFive(control: Control): {[s: string]: boolean} {
        if (control.value.length < 6) {
            return {'passwordTooShort': true};
        }
    }

    lettersAndNumbers(control: Control): {[s: string]: boolean} {

        if (!(control.value).match('[a-zA-Z]+[0-9]+')) {
            return {'needsLettersAndNumbers': true};
        }
    }

}