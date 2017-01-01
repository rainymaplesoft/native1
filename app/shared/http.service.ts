import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";


@Injectable()
export class HttpService {
    headers: Headers;
    requestOptions: RequestOptions;

    constructor(private http: Http) {
        this.requestOptions = this.createRequestOptions();
    }

    post(urlApi: string, stringyfiedModel: string): Observable<Response> {
        return this.http.post(urlApi, stringyfiedModel, this.requestOptions)
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
        headers.append("AuthKey", "my-key");
        headers.append("AuthToken", "my-token");
        headers.append("Content-Type", "application/json");
        let options = new RequestOptions({ headers: headers });
        return options;
    }
}