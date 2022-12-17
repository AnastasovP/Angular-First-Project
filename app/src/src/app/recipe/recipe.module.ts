import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeService } from './recipe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { DetailsComponent } from './details/details.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    NewRecipeComponent,
    RecipeListComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
  ],
  exports:[ ],
  providers:[
    RecipeService,
  ]
})
export class RecipeModule { }
