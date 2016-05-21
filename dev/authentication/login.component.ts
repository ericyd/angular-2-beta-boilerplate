import {Component, OnInit} from '@angular/core';
import {Validators, FormBuilder, ControlGroup} from "@angular/common";
import {AuthService} from "../shared/auth.service";

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