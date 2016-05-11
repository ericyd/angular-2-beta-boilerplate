import {Component, OnInit} from 'angular2/core';
import {User} from "../shared/user.interface";
import {AuthService} from "../shared/auth.service";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";

@Component({
    templateUrl: 'templates/auth/authenticate-user.tpl.html',
})

export class SignupComponent implements OnInit {
    myForm: ControlGroup;
    title: string = 'Sign Up';
    error: boolean = false;
    errorMsg: string = '';



    constructor(private _authService: AuthService, private _fb: FormBuilder) {}
    
    onSubmit() {
        this._authService.signupUser(this.myForm.value);
    }
    
    onSignupError() {
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