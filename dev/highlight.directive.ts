import {Directive, ElementRef, OnInit} from 'angular2/core';
import {Renderer} from "angular2/core";

@Directive({
    selector: '[myHighlight]',
    //Adding the alias allows us to bind to this property simply by adding square brackets around out selector
    // otherwise, we would have to declare myHighlight as the directive and then bind to [highlightColor] separately in the same directive
    inputs: ['highlightColor:myHighlight', 'fontWeight'],
    /* host references the element to which the directive is applied
        In the object, we reference any actions that could occur to the element.
        [key] is the event
        [value] is the function for the given event.

      */
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
    }
}) 

export class HighlightDirective implements OnInit {
    private _defaultColor = 'green';
    highlightColor: string;
    fontWeight: string;

    // this is created when it is attached to an element
    // when it is created, the constructor runs
    // Note: this is a shortcut way of setting the argument equal to a previously declared private variable named _elRef.
    // _elRef now becomes accessible from other functions via this._elRef
    constructor(private _elRef: ElementRef, private _renderer: Renderer) {}


    // note: no longer needed because we're only applying on mouseenter
    ngOnInit():any {
        // this works, but we are going to use the Angular 2 renderer, which is more safe and optimized
        // Note: this code could also be executed within the constructor
        // this._elRef.nativeElement.style.backgroundColor = this._defaultColor;

        // this._renderer.setElementStyle(this._elRef.nativeElement, 'background', this.highlightColor || this._defaultColor);
        // this._renderer.setElementStyle(this._elRef.nativeElement, 'font-weight', this.fontWeight || "normal");

    }

    onMouseEnter() {
        this.highlight(this.highlightColor || this._defaultColor, this.fontWeight || "normal");
    }

    onMouseLeave() {
        this.highlight(null, null);

    }

    private highlight(color:string, fontWeight: string) {
        this._renderer.setElementStyle(this._elRef.nativeElement, 'background', color);
        this._renderer.setElementStyle(this._elRef.nativeElement, 'font-weight', fontWeight );
    }


}