import {Component} from 'angular2/core';
import {LoggingService} from "./services/logging.service";
import {CalculatorService} from "./services/calculator.service";
import {DataService} from "./services/data.service";

@Component({
    selector: 'component-2',
    template: `
        <div>
            <h1>Logging Service</h1>
            <input type="text" #message>
            <button (click)="onLog(message.value)">Send</button>
        </div>
        
        <div>
            <h1>Calculator Service: Add or multiply these numbers</h1>
            <input type="text" #num1>
            <input type="text" #num2>
            <button (click)="onAdd(num1.value,num2.value)">Add</button>
            <button (click)="onMultiply(num1.value,num2.value)">Multiply</button>
            <br>
            <p>Result: {{result}}</p>
        </div>
        
        <div>
            <h1>Data Service</h1>
            <button (click)="onGetData()">Get data</button>
            <p>Data: {{data}}</p>
            <br>
            <input type="text" #newData>
            <button (click)="onInsert(newData.value)">Insert</button>
        </div>
        
    `,
    /*Alternately, we can add this provider in the boot.ts file (see file for notes)
     * Adding the provider to the boot.ts file creates a single instance of the service that is accessible
     * by all children components.  If you want separate instances for each child, you must use this method.
     * For now, we will inject the service at the root level, so I will comment this out.*/
    // providers: [LoggingService],
    providers: [CalculatorService, DataService]
})

export class Component2Component {
    result: string;
    data: string;

    //use the constructor for *injecting services*
    constructor(private _loggingService: LoggingService,
                private _calculatorService: CalculatorService,
                private _dataService: DataService) {}

    onAdd(num1: string, num2: string) {
        this.result = '' + this._calculatorService.add(+num1, +num2);
    }

    onMultiply(num1: string, num2: string) {
        this.result = '' + this._calculatorService.multiply(+num1, +num2);
    }

    onLog(message:string) {
        this._loggingService.log(message);
    }


    onGetData() {
        this.data = this._dataService.getRandomString();
    }

    onInsert(value: string) {
        this._dataService.insert(value);
    }

}