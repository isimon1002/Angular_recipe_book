import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules} from "@angular/router";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { HomeComponent } from "./core/home/home.component";



const appRoutes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
	{ path: 'shoppinglist', component: ShoppingListComponent },
  ];

@NgModule({
	imports: [
		//RouterModule.forRoot(appRoutes, {useHash: true})
		RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
	],
	exports: [RouterModule]
})
export class AppRoutingModule{

}