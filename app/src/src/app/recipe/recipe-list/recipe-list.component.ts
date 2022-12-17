import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'src/app/shared/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  recipes: IRecipe[] | undefined

  constructor(private recipeService: RecipeService) { 
  }
  
  ngOnInit(): void {
    this.fetchRecipes();
    
  }

  fetchRecipes(): void{
    this.recipes = undefined;
    this.recipeService.loadRecipes().subscribe(recipes => this.recipes = recipes)
  }

}
