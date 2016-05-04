import {Control} from "angular2/common";
/**
 * Created by eric on 5/4/16.
 */

export function greaterThanZero(control: Control): {[s: string]: boolean} {
    if (control.value <= 0) {
        return {'notEnough': true};
    }
}