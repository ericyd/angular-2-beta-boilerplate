import {Recipe} from "../shared/recipe.interface";
/**
 * Created by eric on 5/6/16.
 */


export let RECIPES: Recipe[] = [
    new Recipe('Wiener Schnitzel',
        'A tasty Schnitzel',
        'http://images.derberater.de/files/imagecache/456xXXX_berater/berater/slides/WienerSchnitzel.jpg',
        [
            new Ingredient('Pork Meat', 1),
            new Ingredient('French Fries', 1),
            new Ingredient('Salad', 2),
        ]
    ),
    new Recipe('Super Mega Burger', 'Tastes so delicious!', 'http://www.fraeuleinburger.de/tl_files/images/content/burger/Fraeulein-Burger.jpg',
        [
            new Ingredient('Buns', 4),
            new Ingredient('Salad', 1),
            new Ingredient('Hamburger', 4),
            new Ingredient('Vegetables', 2)
        ]
    )
];
