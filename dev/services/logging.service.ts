import {Injectable} from 'angular2/core';

@Injectable()

export class LoggingService {
    log(message: string) {
        console.log(message);
    }
}

