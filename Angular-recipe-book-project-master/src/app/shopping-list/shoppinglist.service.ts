import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingAdded = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients() {
    return this.ingredients.slice(); 
  }

  getIngredient(index: number) {
    console.log(index)
    return this.ingredients[index]
  }

	onIngredientAdded(ing: Ingredient) {
		this.ingredients.push(ing);
  }
  
  addIngredient(ing: Ingredient){
    this.ingredients.push(ing);
    this.ingAdded.next(this.ingredients.slice())
  }

  addIngredients(ings: Ingredient[]){
    // for (let ing of ings){
    //   this.addIngredient(ing)
    // }

    this.ingredients.push(...ings)
    this.ingAdded.next(this.ingredients.slice());
    console.log(this.ingredients)
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingAdded.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index-1, 1)
    this.ingAdded.next(this.ingredients.slice());
  }
}