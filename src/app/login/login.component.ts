import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // 登录表单
    public loginForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router) {
    }

    ngOnInit() {
        // 初始化表单
        this.loginForm = this.fb.group({
            userName: [null, [Validators.required]],
            userPassword: [null, [Validators.required]],
            remember: [true]
        });
    }

    loginSubmitForm(): void {
        this.router.navigateByUrl('main');
    }

}
