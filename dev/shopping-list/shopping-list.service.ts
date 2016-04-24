/**
 * Created by eric on 4/24/16.
 */
import {Injectable} from 'angular2/core';
import {ListItem} from "../list-item";
import {shoppingList} from "./mock-shopping-list";

@Injectable()

export class ShoppingListService {


    getItems() {
        return shoppingList;
    }

    insertItem(item: ListItem) {
        shoppingList.push(item);
    }

    deleteItem(item: ListItem) {
        shoppingList.splice(shoppingList.indexOf(item), 1);
    }
}