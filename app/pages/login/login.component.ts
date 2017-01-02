import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../shared/user";
import { Color } from "color";
import { View } from "ui/core/view"
import { UserService } from "../../shared/user.service";
import { Page } from "ui/page"


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
        let cont = <View>this.container.nativeElement;
        cont.animate({
            backgroundColor:this.isLoggingIn?new Color("white"):new Color('#301217'),
            duration:200
        });
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
