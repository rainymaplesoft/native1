import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user";
import { UserService } from "../../shared/user.service";
import { } from ""


@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: "pages/login/login.html",
    styleUrls: ['pages/login/login-common.css', 'pages/login/login.css'],
})
export class LoginComponent {
    public user: User;
    email = "nativescriptrocks@telerik.com";
    isLoggingIn = true;

    constructor(private router: Router, private userService: UserService) {
        this.user = new User();
        this.user.email = "user@nativescript.org";
        this.user.password = "password";
    }

    toggleDisplay(): void {
        this.isLoggingIn = !this.isLoggingIn;
    }

    public submit() {
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
}
