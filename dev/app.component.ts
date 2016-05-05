import {Component} from 'angular2/core';
import {DataService} from "./data.service";

@Component({
    
    selector: 'my-app',

    template: `
        <div>
            <div class="input">
                <label for="title">Title</label>
                <input id="title" type="text" #title>
                
            </div>
                    
            <div>
                <label for="body">Body</label>
                <input type="text" id="body" #body>
                
            </div>
            
            <div>
                <label for="user-id">User ID</label>
                <input type="text" id="user-id" #userId>
            </div>
            
            <div>
                <button (click)="onPost(title.value, body.value, userId.value)">Post Data</button>
                <button (click)="onGetPosts()">Get all data</button>
                <p>Response: {{response}}</p>                
            </div>

        </div>
        

    `,
    directives: [],
    providers: [DataService]
})

export class AppComponent {
    response: string;

    constructor(private _dataService: DataService) {}

    onPost(title: string, body: string, userId: string) {
        const data = {
            'title': title,
            'body': body,
            'userId': userId
        };
        this._dataService.postData(data)
            // the subscribe method is available on observables
            // the subscribe method is also what actually 'fires' the request defined in the service
            .subscribe(
                data => this.response = JSON.stringify(data),
                error => console.error(error)
            );

    }

    onGetPosts() {
        this._dataService.getData().subscribe(
            data => {
                console.log(data);
                this.response = JSON.stringify(data);
            },
            error => console.error(error)
        )
    }
}
