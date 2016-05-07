import {Recipe} from "../shared/recipe.interface";
import {Ingredient} from "../shared/ingredient.interface";
/**
 * Created by eric on 5/6/16.
 */


export let RECIPES: Recipe[] = [
    new Recipe('Wiener Schnitzel',
        'A tasty Schnitzel',
        'http://images.derberater.de/files/imagecache/456xXXX_berater/berater/slides/WienerSchnitzel.jpg',
        [
            new Ingredient('Pork Meat', 1, 'lb'),
            new Ingredient('French Fries', 1, 'bag'),
            new Ingredient('Salad', 2, 'head'),
        ]
    ),
    new Recipe('Super Mega Burger', 'Tastes so delicious!', 'http://www.fraeuleinburger.de/tl_files/images/content/burger/Fraeulein-Burger.jpg',
        [
            new Ingredient('Buns', 4, ''),
            new Ingredient('Salad', 1, 'head'),
            new Ingredient('Hamburger', 4, 'lbs'),
            new Ingredient('Vegetables', 2, 'bunches')
        ]
    )
];
