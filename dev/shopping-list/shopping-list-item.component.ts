import {Component, EventEmitter} from 'angular2/core';
import {ListItem} from "../list-item";

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
    removed = new EventEmitter<ListItem>();

    /** Emit event that can be heard from parent to delete selected item
     *
     */
    onDelete():void {
        this.removed.emit(this.item);
    }
}