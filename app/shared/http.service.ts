import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { Config } from "../shared/config";


@Injectable()
export class HttpService {
    headers: Headers;
    requestOptions: RequestOptions;

    constructor(private http: Http) {
        this.requestOptions = this.createRequestOptions();
    }

    post(url: string, stringyfiedModel: string): Observable<Response> {
        return this.http.post(url, stringyfiedModel, this.requestOptions)
            .catch(this.handleErrors);
    }

    get(url: string): Observable<Response> {
        return this.http.get(url, this.requestOptions).catch(this.handleErrors);
    }

    private handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return Observable.throw(error);
    }

    private createRequestOptions() {
        let headers = new Headers();
        //headers.append("AuthKey", "my-key");
        if (Config.isLoggedIn) {
            headers.append("Authorization", "Bearer " + Config.token);
        }
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}