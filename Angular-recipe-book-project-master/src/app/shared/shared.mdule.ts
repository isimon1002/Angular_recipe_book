import { DropdownDirective } from "./dopdown.directive";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common'

@NgModule({
	declarations: [
		DropdownDirective
	],
	exports: [CommonModule, DropdownDirective]
})
export class SharedModule {}