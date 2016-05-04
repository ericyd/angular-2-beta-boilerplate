import {Control} from "angular2/common";
/**
 * Created by eric on 5/4/16.
 */

// you can use the class or the function when calling import
// import whichever you'd like, then either call the function, or the class.function


export function hasNumbers(control: Control): {[s: string]: boolean} {
//    only need to return something if validation fails
    if (!control.value.match('\\d+')) {
        return {'noNumbers': true};
    }
}


export class NumberValidator {
    static hasNumbers(control: Control): {[s: string]: boolean} {
        if (!control.value.match('\\d+')) {
            return {'noNumbers': true};
        }
    }
}