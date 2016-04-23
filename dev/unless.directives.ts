import {Directive, TemplateRef, ViewContainerRef} from 'angular2/core';

@Directive({
    selector: '[myUnless]',
    //recall, using the same name as the selector allows us to bind the directive and input data in one step
    inputs: ['myUnless']


})

export class UnlessDirective {
    // must inject a template that will be inserted when directive says to (templateRef)
    //viewcontainerRef is the *place* in which you want to insert it
    constructor(private _templateRef: TemplateRef, private _viewContainerRef: ViewContainerRef) {}

    //    get input and evaluate
    //      either display or not
    // specifies what happens when myUnless is 'set'
    set myUnless(condition: boolean) {
        //if condition is false, then render content
        if (!condition) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainerRef.clear();
        }
    }
}