import {Component, OnInit} from 'angular2/core';
import {ShoppingListEditComponent} from "./shopping-list-edit.component";
import {Ingredient} from "../shared/ingredient.interface";
import {ShoppingListService} from "../shared/shopping-list.service";

@Component({
    template: `
        {{getListError}}
        <h1>Shopping List</h1>
        
        <my-shopping-list-edit [ingredient]="selectedItem"></my-shopping-list-edit>
        
        
        <div class="list">
            <button class="btn" (click)="onAddItem()">Add new item</button>
            <ul>
                <li *ngFor="#item of shoppingList" (click)="onSelectItem(item)">{{item.name}} ({{item.amount}} {{item.units}})</li>
            </ul>
        </div>
    `,
    directives: [ShoppingListEditComponent],
    // remember to add providers for services that are initialized with the constructor!
    providers: [ShoppingListService]
})

export class ShoppingListComponent implements OnInit{
    shoppingList: Ingredient[];
    selectedItem: Ingredient = null;
    getListError:string;

    constructor(private _shoppingListService: ShoppingListService) {}

    // initialize the list by setting the shoppingList property to the result of getAllItems
    ngOnInit():any {
        this._shoppingListService.pullAllItems()
            .subscribe(
                data => {
                    this._shoppingListService.setInitList(data);
                },
                error => {
                    this.getListError = error;
                    console.log(error);
                }
            )
        this.shoppingList = this._shoppingListService.getAllItems();
    }

    onAddItem() {
        this.selectedItem = null;
    }

    onSelectItem(item: Ingredient) {
        this.selectedItem = item;
    }
}