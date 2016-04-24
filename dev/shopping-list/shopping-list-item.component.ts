import {Component, EventEmitter} from 'angular2/core';
import {ListItem} from "../list-item";
import {ShoppingListService} from "./shopping-list.service";

@Component({
    selector: 'shopping-list-item',
    template: `
        <div class="input">
            <label for="item-name">Name</label>
            <input type="text" id="item-name" [(ngModel)]="item.name">
        </div>
        
        <div class="input">
            <label for="item-amt">Amount</label>
            <input type="text" id="item-amt" [(ngModel)]="item.amount">
        </div>
        
        <div class="input">
            <button class="danger" (click)="onDelete()">Delete item</button>
        </div>
    `,
    inputs: ['item'],
    outputs: ['removed']


})

export class ShoppingListItemComponent {
    item: ListItem = {name: '', amount: 0};
    removed = new EventEmitter<any>();

    constructor(private _shoppingListService: ShoppingListService){}
    /** Emit event that can be heard from parent to delete selected item
     *
     */
    onDelete():void {
        this._shoppingListService.deleteItem(this.item);
        this.removed.emit(null);
    }
}