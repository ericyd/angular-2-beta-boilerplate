/**
 * Created by eric on 5/6/16.
 */

import {Injectable, EventEmitter} from 'angular2/core';
import {Recipe} from "../shared/recipe.interface";
import {Http, Headers} from "angular2/http";
import {Observable} from "rxjs/Observable";


declare var Firebase:any;

@Injectable()

export class RecipeService {
    private recipe: Recipe;
    private _recipeList: Recipe[];
    private firebaseRef = new Firebase('https://incandescent-torch-6930.firebaseio.com/recipes');
    private _dataListener: EventEmitter<any> = new EventEmitter<any>();

    constructor(private _http: Http) {}

    getAllRecipes() {
        // return RECIPES;

        this.firebaseRef.on("value", function(snapshot) {
            this._dataListener.emit(snapshot.val());
            this._recipeList = snapshot.val();
        }, function (errorObject) {
            console.log("The read failed: " + errorObject);
        }, this);

        return this._recipeList;

        // return this._http.get('https://incandescent-torch-6930.firebaseio.com/recipes.json')
        //     .map(response => response.json());

    }


    listen(): EventEmitter<any> {
        return this._dataListener;
    }


    getMostRecentRecipes(): Observable<any> {
        const query = '?orderBy="added"';
        return this._http.get(`https://incandescent-torch-6930.firebaseio.com/recipes.json${query}`)
            .map(response => response.json());
    }

    getSingleRecipe(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (id !== null) {
                const firebaseRef = new Firebase(`https://incandescent-torch-6930.firebaseio.com/recipes/${id}`);

                firebaseRef.once("value", function(snapshot) {
                    this.recipe = new Recipe(
                        snapshot.val().name,
                        snapshot.val().content,
                        snapshot.val().imageUrl,
                        snapshot.val().ingredients,
                        snapshot.key()
                    );
                    resolve(this.recipe);

                }, function (errorObject) {
                    console.log("The read failed: " + errorObject.code);
                    reject(errorObject.code);
                }, this);

            } else {
                reject('id === null');
            }
        });
    }

    putRecipe(item: Recipe): Observable<any> {
        // get data from current session
        const uid = localStorage.getItem('uid');
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';


        // build request
        item['author'] = uid;
        item['added'] = (new Date()).getUTCMilliseconds();
        item['last_updated'] = (new Date()).getUTCMilliseconds();

        const body = JSON.stringify(item);
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');


        // send request
        return this._http.post(`https://incandescent-torch-6930.firebaseio.com/recipes.json${token}`,
            body, {headers: headers})
            .map(response => response.json());
    }

    deleteRecipe(id: string): Observable<any> {
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';
        return this._http.delete(`https://incandescent-torch-6930.firebaseio.com/recipes/${id}.json${token}`);
    }

    updateRecipe(id: string, item: Recipe): Observable<any> {
        const token = localStorage.getItem('token') !== null ? '?auth=' + localStorage.getItem('token') : '';
        const body = JSON.stringify(item);
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this._http.patch(`https://incandescent-torch-6930.firebaseio.com/recipes/${id}/.json${token}`, body, {headers: headers})
            .map(response => response.json());
    }

    getCurrentRecipe() {
        return this.recipe;
    }

    clearCurrentRecipe() {
        this.recipe = null;
    }

}