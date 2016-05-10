import {Component} from 'angular2/core';
import {Ingredient} from "../shared/ingredient.interface";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    selector: 'my-shopping-list-edit',
    template: `
        <h1>{{ingredient === null ? 'Add' : 'Edit'}} Item</h1>
        <form id="shopping-list-add" (ngSubmit)="onSubmit(f.value)" #f="ngForm">
            <label for="item-name">Name</label>
            <!--the ?. operator means only bind to the name property if ingredient exists, skip if null-->
            <input type="text" id="item-name" required [ngModel]="ingredient?.name" ngControl="name">
            
            <label for="item-amount">Amount</label>
            <input type="text" id="item-amount" required [ngModel]="ingredient?.amount" ngControl="amount">
            
            <label for="item-units">Units</label>
            <input type="text" id="item-units" required [ngModel]="ingredient?.units" ngControl="units">
            
            <button class="btn" type="submit">{{ingredient === null ? 'Add' : 'Edit'}}</button>
            <button class="btn danger" *ngIf="ingredient !== null" (click)="onDelete()">Delete Item</button>
        </form>
    `,
    inputs: ['ingredient'], 
    styleUrls: ['src/css/shopping-list.css'],
    // no need for provider, because this component is a child of ShoppingListComponent, which has the provider set
    // providers: [ShoppingListService]
})

export class ShoppingListEditComponent {
    ingredient: Ingredient;
    response: string;

    constructor(private _shoppingListService: ShoppingListService) {}

    // this takes an Ingredient because the form has the same format as an Ingredient class
    onSubmit(item: Ingredient) {
        // if ingredient exists, it means it was selected, and therefore we should update the item.
        // else, we must add the new item
        if (this.ingredient !== null) {
            this._shoppingListService.updateItem(this._shoppingListService.getIndexOfItem(this.ingredient), item);
        } else {
            this._shoppingListService.insertItem(item);
            // this._shoppingListService.postItem(item)
            //     .subscribe(
            //         data => {this.response = JSON.stringify(data);this.ingredient = null},
            //         error => console.log(error)
            //     );
        }

        this.ingredient = null;
    }

    onDelete() {
        this._shoppingListService.deleteItem(this.ingredient);
        this.ingredient = null;
    }


}