import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user";
import { Color } from "color";
import { View } from "ui/core/view"
import { UserService } from "../../shared/user.service";
import { Page } from "ui/page";
import { setHintColor } from "../../shared/hint-util";
import { TextField } from "ui/text-field";


@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: "pages/login/login.html",
    styleUrls: ['pages/login/login-common.css', 'pages/login/login.css'],
})
export class LoginComponent implements OnInit {
    public user: User;
    email = "nativescriptrocks@telerik.com";
    isLoggingIn = true;
    @ViewChild("container") container: ElementRef;
    @ViewChild("email") elEmail: ElementRef;
    @ViewChild("password") elPassword: ElementRef;

    constructor(private page: Page, private router: Router, private userService: UserService) {
        this.user = new User();
        this.user.email = "user@nativescript.org";
        this.user.password = "password";
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }

    toggleDisplay(): void {
        this.isLoggingIn = !this.isLoggingIn;
        this.setTextFieldColors();
        let cont = <View>this.container.nativeElement;
        cont.animate({
            backgroundColor: this.isLoggingIn ? new Color("white") : new Color('#301217'),
            duration: 200
        });
    }


    public submit() {
        if (!this.user.isValidEmail()) {
            alert('Please enter a valid email address');
            return;
        }
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
        //console.log("Sign in button tapped.")
    }

    login() {
        this.userService.login(this.user)
            .subscribe(
            () => this.router.navigate(['/list']),
            (error) => alert("Failed to authenticate")
            );
    }

    signUp() {
        this.userService.register(this.user)
            .subscribe(
            (user) => {
                alert("Your account was successfully created.");
                console.log(user.email);
                this.toggleDisplay();
            },
            () => alert("We couldn't create your account!")
            );
    }

    private setTextFieldColors() {
        let emailTextField = <TextField>this.elEmail.nativeElement;
        let passwordTextField = <TextField>this.elPassword.nativeElement;

        let mainTextColor = new Color(this.isLoggingIn ? 'black' : '#C4AFB4');
        emailTextField.color = mainTextColor;
        passwordTextField.color = mainTextColor;

        let hintColor = new Color(this.isLoggingIn ? '#ACA6A7' : '#C4AFB4');
        setHintColor({ view: emailTextField, color: hintColor });
        setHintColor({ view: passwordTextField, color: hintColor });
    }
}
