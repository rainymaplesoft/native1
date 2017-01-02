import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Config } from "../config";
import { Grocery } from './grocery';
import { HttpService } from '../http.service';

@Injectable()
export class GroceryService {
    constructor(private http: HttpService) {

    }

    loadList(): Observable<Array<Grocery>> {
        let data = this.buildList();
        return this.http.post(Config.urlGroceryList, JSON.stringify(data))
            .map(res => <Array<Grocery>>res.json().json);
    }

    add(name: string): Observable<Grocery> {
        let id = this.generateId(3);
        return this.http.post(Config.urlGroceryList, JSON.stringify({ id: id.toString(), name: name }))
            .map(res => <Grocery>res.json().json);
    }

    private buildList(name?: string): Array<Grocery> {
        let groceryList = new Array<Grocery>();
        groceryList.push({ id: '1', name: 'Apples' });
        groceryList.push({ id: '2', name: 'Bananas' });
        groceryList.push({ id: '3', name: 'Oranges' });
        groceryList.push({ id: '4', name: 'Grapes' });
        if (name) {
            let newId = groceryList.length + 1;
            groceryList.push({ id: newId.toString(), name: name });
        }
        return groceryList;
    }

    generateId(length?: number) {

        if (length != undefined) {
            length = 8;
        }

        let timestamp = +new Date;

        var _getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var ts = timestamp.toString();
        var parts = ts.split("").reverse();
        var id = "";

        for (var i = 0; i < length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return id;
    }
}