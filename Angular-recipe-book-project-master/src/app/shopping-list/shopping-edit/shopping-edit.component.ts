import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  ingsArr = []
  @ViewChild('f') slForm: NgForm;

  constructor(private shopping: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shopping.startedEditing.subscribe((index: number) => {
      this.editedItemIndex = index;
      this.editMode = true;
      this.editedItem = this.shopping.getIngredient(index);
      console.log(this.editedItem)
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    }
  )
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngedient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.shopping.updateIngredient(this.editedItemIndex, newIngedient)
    } else {
      this.shopping.addIngredient(newIngedient)
    }
    form.reset();
    this.editMode = false;

}

clear(){
  this.slForm.reset();
  this.editMode = false;
}

delete(index: number){
  this.shopping.deleteIngredient(this.editedItemIndex -1);
  this.clear();
}
ngOnDestroy() {
  this.subscription.unsubscribe();
}
}
