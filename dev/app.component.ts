import {Component} from 'angular2/core';
import {ReversePipe} from "./reverse.pipe";

@Component({
    
    selector: 'my-app',
    // The arguments to pipes are given after the colon
    // chain arguments by chaining colons (see Slice pipe)
    template: `
        <section class="pipe">
            <h2>Date</h2>
            <p>Today's date: {{today | date:'long'}}</p>
            <p>Additional options for string formatting: Angular2 docs, API Preview, search pipe</p>
        </section>
        
        <section class="pipe">
            <h2>UPPERCASE and lowercase pipe</h2>
            <input type="text" #upperlower (keyup)="0"><br>
            <p>lowercase: {{upperlower.value | lowercase}}</p>
            <p>UPPERCASE: {{upperlower.value | uppercase}}</p>
        </section>
        
        <section class="pipe">
            <h2>Slice pipe</h2>
            <input type="text" #slicePipe (keyup)="0"> from 
            <input type="text" #start (keyup)="0"> to 
            <input type="text" #end (keyup)="0"> 
            <br>
            <p>Sliced output: {{slicePipe.value | slice:start.value:end.value}}</p>
        </section>
        
        
        <section class="pipe">
            <h2>Number pipe</h2>
            <input type="text" #decimalPipe (keyup)="0">  
            currency: <input type="text" #currencyPipe value="EUR" (change)="0">
            <br>
            <!--Must multiply by 1.0 to make a decimal from the input.
            Syntax of pipe: number:'<wholeNumberPlaces>.<decimalPlacesRange>'-->
            <p>Decimal output: {{1.0 * decimalPipe.value | number:'1.1-2'}}</p>
            <p>Customized currency output: {{1.0 * decimalPipe.value | currency:currencyPipe.value:currencyShort.checked:'1.2-2'}}</p>
            <input type="checkbox" #currencyShort checked (change)="0">Short Currency Code
        </section>
        
        <section class="pipe">
            <h2>Chaining pipes (e.g. uppercase and slice</h2>
            <input type="text" #chainPipes (keyup)="0"><br>
            <p>Output: {{chainPipes.value | slice:1:3 | uppercase }}</p>
        </section>
        
        <section class="pipe">
            <h2>Custom reverse pipe</h2>
            <input type="text" #reversePipe (keyup)="0"><br>
            <p>Output: {{reversePipe.value | myReverse }}</p>
        </section>
        
        <section class="pipe">
            <h2>Stateful pipes - Async</h2>
            <p>listens to the state of the pipe and returns a value only when its "ready"</p>
            <input type="text" #asyncPipe (keyup)="0"><br>
            <!--The async pipe tells Angular that statefulPipeOutput is an async property, so 
            it waits for statefulPipeOutput to return the data-->
            <p>Output (rec'd after 2 secs): {{statefulPipeOutput | async}}</p>
        </section>
    `,
    directives: [],
    pipes: [ReversePipe]
})



export class AppComponent {
    today = new Date();

    statefulPipeOutput = new Promise((resolve, reject) => {
        setTimeout(() => resolve('Data is there'), 2000);
    });
}
