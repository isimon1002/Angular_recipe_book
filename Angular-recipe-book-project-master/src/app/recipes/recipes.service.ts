import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
	recipesChanged = new Subject<Recipe[]>();
	private recipes: Recipe[] = [
		new Recipe(' Schwarma', 'Delicious schwarma', 'https://i2.wp.com/media.hungryforever.com/wp-content/uploads/2018/02/13112913/beef-shawarma.jpg?ssl=1?w=356&strip=all&quality=80',[ new Ingredient('Meat', 1), new Ingredient('Laffa', 1), new Ingredient('Salad', 2)] ),
		new Recipe(' Josh\'s special Mac n Chesse', 'It has all the cheese', 'https://images-gmi-pmc.edge-generalmills.com/c41ffe09-8520-4d29-9b4d-c1d63da3fae6.jpg', [ new Ingredient('Mozzarella', 5), new Ingredient('Americian cheese', 5), new Ingredient('Powder Cheese', 5), new Ingredient('pasta', 20)] )
	  ];
	
	  constructor(private shooppingService: ShoppingListService){

		}
		
		setRecipes(recipes: Recipe[]) {
			this.recipes = recipes;
			this.recipesChanged.next(this.recipes.slice())
		}
	  getRecipes() {
		  return this.recipes.slice();
	  }

	  getRecipe(id: number) {
		  return this.recipes[id]
	  }

	  addIngredientsToShoppingList(ingredients: Ingredient[]){
		  this.shooppingService.addIngredients(ingredients);
		  console.log(ingredients)		
	  }

	  getRecipeId(recipe){
		  console.log(this.recipes.indexOf(recipe))
	  }

	  addRecipe(recipe: Recipe) {
		this.recipes.push(recipe)
		this.recipesChanged.next(this.recipes.slice())
	  }

	  updateRecipe(index: number, newRecipe: Recipe){
		this.recipes[index] = newRecipe;
		this.recipesChanged.next(this.recipes.slice())
	  }

	  deleteRecipe(index: number){
		this.recipes.splice(index-1, 1)
		this.recipesChanged.next(this.recipes.slice());
	  }

}