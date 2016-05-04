import {Component, OnInit} from 'angular2/core';
import {ShoppingListNewItemComponent} from "./shopping-list-new-item.component";
import {ListItem} from "../list-item";
import {ShoppingListItemComponent} from "./shopping-list-item.component";
import {ShoppingListService} from "./shopping-list.service";
import {ShoppingListNewItemFormComponent} from "./shopping-list-new-item-form.component";
import {FormBuilder} from "angular2/common";

@Component({
    selector: 'shopping-list',
    template: `
        <section>
            <shopping-list-new-item-form></shopping-list-new-item-form>
        </section>
        
        <section>
            <h3>My List</h3>
            <div class="list">
                <ul>
                    <li *ngFor="#listItem of listItems" (click)="onSelect(listItem)">{{listItem.name}} ({{listItem.amount}})</li>
                </ul>
            </div>
        </section>
        
        <section *ngIf="selectedItem != null">
            <shopping-list-item [item]="selectedItem" (removed)="onRemove()"></shopping-list-item>
        </section>
    `,
    directives: [ShoppingListNewItemFormComponent, ShoppingListItemComponent],

    /*Note: the providers metadata is the only place where the service is instantiated.
    * Thus, each child component (shipping-list-new-item and shopping-list-item) will be able to access
    * the SAME instance of the ShoppingListService service.  Regardless, you still need to
    * construct the service in the constructor in each component, even if its injected in the parent*/
    providers: [ShoppingListService],
})

export class ShoppingListComponent implements OnInit {
    listItems: Array<ListItem>;
    selectedItem: ListItem;

    constructor(private _shoppingListService: ShoppingListService) {}

    onSelect(item: ListItem) {
        this.selectedItem = item;
    }

    ngOnInit(): any {
        this.listItems = this._shoppingListService.getItems();
    }

    onRemove() {
        this.selectedItem = null;
    }

}