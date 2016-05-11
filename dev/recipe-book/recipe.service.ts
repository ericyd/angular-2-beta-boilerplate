/**
 * Created by eric on 5/6/16.
 */

import {Injectable} from 'angular2/core';
import {Recipe} from "../shared/recipe.interface";
import {RECIPES} from "../mock/recipes";
import {Http, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";


@Injectable()

export class RecipeService {
    
    constructor(private _http: Http) {}

    getAllRecipes(): Observable<any> {
        // return RECIPES;
        return this._http.get('https://incandescent-torch-6930.firebaseio.com/recipes.json')
            .map(response => response.json());
    }

    getSingleRecipe(index: number) {
        return RECIPES[index];
    }

    putRecipe(item: Recipe): Observable<any> {
        // build request
        const body = JSON.stringify(item);
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');

        // get data from current session
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';

        // send request
        return this._http.post(`https://incandescent-torch-6930.firebaseio.com/recipes/${uid}.json${token}`,
            body, {headers: headers})
            .map(response => response.json());
    }

    getIndexOfRecipe(item: Recipe) {
        return RECIPES.indexOf(item);
    }

    insertRecipe(item: Recipe) {
        return RECIPES.push(item);
    }

    deleteRecipe(index: number) {
        // return RECIPES.splice(RECIPES.indexOf(item), 1);
        return RECIPES.splice(index, 1);
    }

    updateRecipe(index: number, item: Recipe) {
        return RECIPES[index] = item;
    }
}