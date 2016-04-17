import {Component} from 'angular2/core';
import {HighlightDirective} from "./highlight.directive";
/*this directive will highlight an element, and the highlight color can be specified with property binding*/
@Component({
    selector: 'my-attribute-directives',
    template: `
        <div [myHighlight]=" 'red' ">
            Highlight me
        </div>
        
        <br><br>
        
        <div myHighlight [fontWeight]=" 'bold' ">
            Another highlight
        </div>
        <br> <br>
        <div [myHighlight]=" '#ccc' " [fontWeight]=" 'light' ">
            Another highlight
        </div>
    `,
    directives: [HighlightDirective]

})
export class AttributeDirectives {


}