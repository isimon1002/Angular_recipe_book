import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipes.service";
import { Observable } from "rxjs";
import { Recipe } from "../recipes/recipe.model";
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";



@Injectable()
export class DataStorageService {
	constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService){}

	storeRecipes() {
		//const token = this.authService.getToken()
		// const req = new HttpRequest('PUT', 'https://angular-recipe-55b94.firebaseio.com/recipes.json', this.recipesService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)})
		// return this.http.request(req);
		// return this.http.put('https://angular-recipe-55b94.firebaseio.com/recipes.json', this.recipesService.getRecipes(), {observe: 'events', params: new HttpParams().set('auth', token)});
		const req = new HttpRequest('PUT', 'https://angular-recipe-55b94.firebaseio.com/recipes.json', this.recipesService.getRecipes(), {reportProgress: true})
		return this.http.request(req);
	}
	getRecipes() {
		//const token = this.authService.getToken()
		//const headers = new HttpHeaders().set('Authorization', 'Bearer skdfafhjgnf')
		return this.http.get<Recipe[]>('https://angular-recipe-55b94.firebaseio.com/recipes.json', 
		{ observe: 'body'
		//headers: headers 
	// 	params: new HttpParams().set('auth', token)
		})
		.map(
			(recipes ) => {
			for (let recipe of recipes) {
				if(!recipe['ingredients']) {
					console.log(recipe)
					recipe['ingredients'] = [];
				}
			}
			return recipes;
		}).subscribe((recipes: Recipe[]) => {
			this.recipesService.setRecipes(recipes);
		})
	}


}