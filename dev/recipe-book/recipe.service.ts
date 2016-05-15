/**
 * Created by eric on 5/6/16.
 */

import {Injectable, EventEmitter} from 'angular2/core';
import {Recipe} from "../shared/recipe.interface";
import {RECIPES} from "../mock/recipes";
import {Http, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";


declare var Firebase:any;

@Injectable()

export class RecipeService {
    private _returnedData: EventEmitter<Recipe> = new EventEmitter<Recipe>();
    private recipe: Recipe;
    private firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com/recipes');

    constructor(private _http: Http) {}

    getAllRecipes(): Observable<any> {
        // return RECIPES;

        // this.firebaseRef.on("value", function(snapshot) {
        //     console.log(snapshot.val());
        //     return snapshot.val();
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject);
        // });

        return this._http.get('https://incandescent-torch-6930.firebaseio.com/recipes.json')
            .map(response => response.json());
    }

    getMostRecentRecipes(): Observable<any> {
        const query = '?orderBy="added"'
        return this._http.get(`https://incandescent-torch-6930.firebaseio.com/recipes.json${query}`)
            .map(response => response.json());
    }

    getSingleRecipe(name: string) {
        console.log("getSingleRecipe()");
        this.firebaseRef.orderByChild("name").equalTo(name).once("value", function(snapshot) {
            let data = Object.keys(snapshot.val())[0];
            if (data) {
                 let newRecipe = new Recipe(
                    snapshot.val()[data].name,
                    snapshot.val()[data].content,
                    snapshot.val()[data].imageUrl,
                    snapshot.val()[data].ingredients
                );
                this._returnedData.emit(newRecipe)
            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject);
        }, this);


        // return this._http.get(`https://incandescent-torch-6930.firebaseio.com/recipes.json${query}`)
        //     .map(response => response.json());
    }

    putRecipe(item: Recipe): Observable<any> {
        // get data from current session
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';


        // build request
        item['author'] = uid;
        item['added'] = (new Date()).getDate();
        item['last_updated'] = (new Date()).getDate();

        const body = JSON.stringify(item);
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');


        // send request
        return this._http.post(`https://incandescent-torch-6930.firebaseio.com/recipes.json${token}`,
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

    getReturnedData(): EventEmitter<Recipe> {
        return this._returnedData;
    }

    getCurrentRecipe(): Recipe {
        return this.recipe;
    }
}