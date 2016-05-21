import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {ControlGroup, FormBuilder, Validators, Control} from "@angular/common";

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
        });

        this._authService.getAuthError()
            .subscribe(
                (error) => {
                    this.error = true;
                    this.errorMsg = error;
                }
            );
    }



    isSamePassword(control: Control): {[s: string]: boolean} {
        if (!this.myForm) {
            return {'formNotComplete': true};
        }

        if (control.value !== this.myForm.controls['password'].value) {
            return {'passwordsDoNotMatch': true};
        }
    }

    //noinspection JSMethodCanBeStatic
    largerThanFive(control: Control): {[s: string]: boolean} {
        if (control.value.length < 6) {
            return {'passwordTooShort': true};
        }
    }

    //noinspection JSMethodCanBeStatic
    lettersAndNumbers(control: Control): {[s: string]: boolean} {

        if (!(control.value).match('[a-zA-Z]+[0-9]+')) {
            return {'needsLettersAndNumbers': true};
        }
    }

}