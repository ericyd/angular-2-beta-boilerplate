import {Component} from "angular2/core";
import {UnlessDirective} from './unless.directives';

@Component({
    selector: 'my-structural-directives',
    /*
    All structural directives are called with an asterisk in the beginning
    *ngIf=""
    * whatever is between the quotation marks must resolve to true/false
    * can call a function that return boolean as well
    * */
    template: `
        <section class="directive">
            <h2>*ngIf</h2>
            <div>
                Enter a number higher than ten.
                <br>
                <input type="text" #number (keyup)="0">
            </div>
            
            <div *ngIf="number.value > 10">
                Number is greater than 10.
            </div>
            
            <div *ngIf="testSomething()">
                Something is true.
            </div>
        </section>
        
        <section class="directive">
            <h2>*ngFor</h2>
            
            <div>
                <ul>
                    <li *ngFor="#item of list, #i = index">{{item}}, {{i}}</li>                
                </ul>
            </div>
        </section>
        
        <section class="directive">
        
            <h2>[ngSwitch]</h2>
            
            <div>
                Enter 'red', 'blue', or 'green'
                <br>
                <input type="text" #color (keyup)="0">
            </div>
            
            <div [ngSwitch]="color.value">
                <template [ngSwitchWhen]="'red'">
                    <span style="color:red">Color is red</span>  
                </template>
                <template [ngSwitchWhen]="'green'">
                    <span style="color:green">Color is green</span>  
                </template>
                <template [ngSwitchWhen]="'blue'">
                    <span style="color:blue">Color is blue</span>  
                </template>
                <template ngSwitchDefault>
                    <span style="color:deeppink">Color is default</span>  
                </template>
            </div>
        </section>
        
        <section class="directive">
            <h2>Custom directive *myUnless</h2>
            
            <div>
                Enter true or false
                <br>
                <input #condition type="text" (keyup)="0">
            </div>
            
            <div *myUnless="condition.value != 'false' ">
                Only show if false was entered
            </div>
        
        </section>
    `,
    directives: [UnlessDirective]
})

export class StructuralDirectives {
    /*recall, #item is a local variable
    * */
    list = ['bread', 'apple', 'banana'];

    private testSomething():boolean {
        let x = 1;
        let y = 6;
        let z = 5;
        return y - x === z;
    }
}