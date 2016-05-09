/**
 * Created by eric on 5/4/16.
 */
import {Injectable} from 'angular2/core';
import {Ingredient} from "./ingredient.interface";
import {SHOPPING_LIST} from "../mock/shopping-list";
import {Http, Headers} from "angular2/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Injectable()

export class ShoppingListService {
    constructor(private _http: Http) {}

    pullAllItems(): Observable<any> {
        return this._http.get('https://incandescent-torch-6930.firebaseio.com/http-test.json')
            .map(response => response.json());
    }

    setInitList(data:any) {
        for (let item in data) {
            // console.log(data[item]);
            SHOPPING_LIST.push(new Ingredient(data[item].name, data[item].amount, data[item].units));
        }
    }
    
    // setShoppingList
    
    getAllItems() {
        return SHOPPING_LIST;
    }

    /*postData(data: any): Observable<any> {
        const body = JSON.stringify(data);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://incandescent-torch-6930.firebaseio.com/http-test.json', body, {'headers': headers})
            // map transforms the data stream that we get back, and parses it at JSON
            // map is rxjs-specific for observables
            .map(response => response.json());
    }*/

    getItem(index: number) {
        return SHOPPING_LIST[index];
    }

    getIndexOfItem(item: Ingredient) {
        return SHOPPING_LIST.indexOf(item);
    }

    insertItem(item: Ingredient) {
        return SHOPPING_LIST.push(item);
    }

    postItem(item: Ingredient): Observable<any> {
        const body = JSON.stringify(item);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('https://incandescent-torch-6930.firebaseio.com/http-test.json', body, {'headers': headers})
            // map transforms the data stream that we get back, and parses it at JSON
            // map is rxjs-specific for observables
            .map(response => response.json());
    }

    insertItems(items: Ingredient[]) {
        return Array.prototype.push.apply(SHOPPING_LIST, items);
    }

    deleteItem(item: Ingredient) {
        SHOPPING_LIST.splice(SHOPPING_LIST.indexOf(item), 1)
    }

    updateItem(index: number, item: Ingredient) {
        SHOPPING_LIST[index] = item;
    }
}