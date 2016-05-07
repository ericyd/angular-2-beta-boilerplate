/**
 * Created by eric on 5/4/16.
 */
export class Ingredient {
    name: string;
    amount: number;
    units: string;

    constructor(name: string, amount:number, units: string) {
        this.name = name;
        this.amount = amount;
        this.units = units;
    }
}