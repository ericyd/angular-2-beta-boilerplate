import {Component, OnInit} from 'angular2/core';
import {ControlGroup, ControlArray, Control, Validators, FormBuilder} from "angular2/common";
import {RouteParams, Router, ComponentInstruction} from "angular2/router";
import {Recipe} from "../shared/recipe.interface";
import {RecipeService} from "./recipe.service";

@Component({
    templateUrl: 'templates/recipes/recipe-edit.tpl.html'
})

export class RecipeEditComponent implements OnInit{
    myForm: ControlGroup;
    recipe: Recipe;
    private _editMode: string = 'create';
    private _recipeIndex: string;
    private _submitted: boolean = false;


    constructor(private _routeParams: RouteParams, private _recipeService: RecipeService,
                private _formBuilder: FormBuilder, private _router: Router) {}

    onAddItem(name: string, amount: string, units: string) {
        (<ControlArray>this.myForm.controls['ingredients']).push(
            new ControlGroup(
                {
                    'name': new Control(name, Validators.required),
                    'amount': new Control(amount, Validators.compose([
                        Validators.required,
                        hasNumbers,
                        greaterThanZero

                    ])),
                    'units': new Control(units, Validators.required)
                }
            )
        );
    }

    onRemoveItem(index:number) {
        (<ControlArray>this.myForm.controls['ingredients']).removeAt(index);
    }

    onSubmit() {
        this.recipe = this.myForm.value;
        if (this._editMode == 'edit') {
            this._recipeService.updateRecipe(this._recipeIndex, this.recipe);
        } else {
            this._recipeService.insertRecipe(this.recipe);
        }
        this._submitted = true;
        this.navigateBack();
    }

    onCancel() {
        this.navigateBack();
    }

    navigateBack() {
        this._router.navigate(['RecipeDetail', {'recipeIndex': this._recipeIndex}]);
    }

    routerCanDeactivate(nextInstruction: ComponentInstruction, previousInstruction: ComponentInstruction) {
        if (this._submitted || this.myForm.pristine) {
            return true;
        }

        return confirm("Are you sure you'd like to leave?");
    }

    ngOnInit():any {
        // create form on init

        // fetch from ruoter if editing or creating
        this._editMode = this._routeParams.get('editMode');

        let fbRecipeName = '';
        let fbRecipeImageUrl = '';
        let fbRecipeContent = '';
        // controls are basically inputs which a form controls
        let fbIngredients: ControlArray = new ControlArray([]);

        // if editing, populate controls with values
        if (this._editMode == 'edit') {
            // get values and set current recipe
            this._recipeIndex = this._routeParams.get('recipeIndex');
            this.recipe = this._recipeService.getSingleRecipe(+this._recipeIndex);

            // populate controlarray
            for (let i = 0; i < this.recipe.ingredients.length; i++) {
                fbIngredients.push(
                    // a ControlGropu is essentially a conttrol in and of iteself
                    // in contrast, a controlArray just holds them, cannot be controlled itself
                    new ControlGroup(
                        {
                            'name': new Control(this.recipe.ingredients[i].name, Validators.required),
                            'amount': new Control(this.recipe.ingredients[i].amount, Validators.compose([
                                Validators.required,
                                hasNumbers,
                                greaterThanZero

                            ])),
                            'units': new Control(this.recipe.ingredients[i].units, Validators.required)
                        }
                    )
                );
                fbRecipeName = this.recipe.name;
                fbRecipeImageUrl = this.recipe.imageUrl;
                fbRecipeContent = this.recipe.content
            }

        }

        // this initializes the actual form
        this.myForm = this._formBuilder.group({
            name: [fbRecipeName, Validators.required],
            imageUrl: [fbRecipeImageUrl],
            content: [fbRecipeContent],
            ingredients: this._formBuilder.array(fbIngredients.controls)
        });
    }
}

function hasNumbers(control: Control): {[s: string]: boolean} {
    if (!('' + control.value).match('\\d+')) {
        return {noNumbers: true};
    }
}

function greaterThanZero(control: Control): {[s: string]: boolean} {
    if (!(+control.value > 0 )) {
        return {tooSmall: true};
    }
}