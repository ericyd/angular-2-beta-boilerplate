import {RouterOutlet, Router, ComponentInstruction} from "angular2/router";
import {Directive, ElementRef, DynamicComponentLoader, Attribute} from "angular2/core";
import {AuthService} from "./auth.service";
/**
 * Created by eric on 5/11/16.
 */

// because this doesn't have its own view, its just a directive, not a component

@Directive({
    // using square brackets writes an attribute selector, similar to CSS.
    // ommitting square brackets makes a tag that can sit on the document body, similar to a component.
    // summary: if you're using a directive as its own tag, then no brackets.
    // If you're using it for property binding, use square brackets.
    selector: 'auth-router-outlet'
})

export class AuthRouterOutlet extends RouterOutlet {
    // list of protected routes
    // we can then check which routes are protected whenever we're trying to navigate somewhere
    // syntax: path: boolean
    // where path omits the beginning /
    // and boolean is true if you need authentication to access
    private _protectedRoutes = {
        'protected': true
    };


    // injecting a couple of classes that the RouterOutlet expects
    // since we aren't completely overwriting it, just extending it, we still need the providers that
    // the parent expects.
    // We will then call the parent constructor with super(), so it will be initialized much like RouterOutlet.
    // This allows us to only add the small snippet of code that we want to add (i.e. authenticating routes) instead of re-writing the whole outlet.


    /**
     *
     * @param _elementRef A reference to the element in which the router-outlet is put (i.e. where to render the component)
     * @param _loader Allows you to dynamically create components and insert them in specific places in the DOM
     * @param _parentRouter Needs the router to know what to render and when and where
     * @Attribute: allows the router to get a certain name (or something)  only needed by parent
     */
    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router, @Attribute('name') _nameAttr: string,
                // auth service only needed for our custom function
                private _authService: AuthService ) {
        // simply calling super() makes this custom directive behave identically to the native router-outlet directive
        super(_elementRef, _loader, _parentRouter, _nameAttr);
    }

    // this method is called the moment before we want to activate the router
    activate(nextInstruction: ComponentInstruction): Promise<any> {
        // extract the path we're navigating to
        const url = nextInstruction.urlPath;

        // check if this url is in the protected path object AND if we're not authenticated
        if (this._protectedRoutes[url] && !this._authService.isAuthenticated()) {
            // redirect to Signin route
            this._parentRouter.navigate(['Signin']);
        }

        // return a Promise - this basically tells the router to continue its default functionality,
        // even if we've changed the destination in the above if statement
        return super.activate(nextInstruction);
    }

}