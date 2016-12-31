import { Component } from "@angular/core";
import { User } from "./shared/user";
import { UserService } from "./shared/user.service";


@Component({
    selector: "my-app",
    providers: [UserService],
    templateUrl: "pages/login/login.html",
    styleUrls: ['pages/login/login-common.css', 'pages/login/login.css'],
})
export class AppComponent {
    public user: User;
    email = "nativescriptrocks@telerik.com";
    isLoggingIn = true;

    constructor(private userService: UserService) {
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
        //
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
