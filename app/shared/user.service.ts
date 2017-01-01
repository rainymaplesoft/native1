import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { HttpService } from "./http.service";
import { Config } from "../shared/config";
import { User } from "./user";

@Injectable()
export class UserService {

    constructor(private HttpService: HttpService) {

    }

    register(user: User): Observable<User> {
        return this.HttpService.post(Config.apiUrl + '/post', JSON.stringify(user))
            .map(result => <User>result.json().json);
        //.do(r => console.log(JSON.stringify(r));
    }

    login(user: User): Observable<Response> {
        let url = Config.apiUrl + "/post";
        let data = JSON.stringify({
            username: user.email,
            password: user.password,
            grant_type: "password"
        });
        return this.HttpService.post(url, data);
    }
}
