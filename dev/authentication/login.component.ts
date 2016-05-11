import {Component, OnInit} from 'angular2/core';
import {Validators, FormBuilder, ControlGroup} from "angular2/common";
import {AuthService} from "../shared/auth.service";
import {Router} from "angular2/router";

@Component({
    templateUrl: 'templates/auth/authenticate-user.tpl.html',
})

export class LoginComponent implements OnInit {
    title: string = "Login";
    error: boolean = false;
    errorMsg: string = '';
    myForm: ControlGroup;

    constructor(private _fb: FormBuilder, private _authService: AuthService) {}

    onSubmit() {
        this._authService.loginUser(this.myForm.value);
            // .then(
            // (authData) => {
            //     localStorage.setItem('token', authData.auth);
            //     this._router.navigate(['Recipes']);
            // },
            // (error) => {
            //     this.error = true;
            //     this.errorMsg = error;
            // });
    }

    ngOnInit(): any {
        this.myForm = this._fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });

        this._authService.getAuthError()
            .subscribe(
                (error) => {
                    this.error = true;
                    this.errorMsg = error;
                }
            );
    }

}