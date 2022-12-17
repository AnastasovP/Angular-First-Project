import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe/recipe.service';
import { IRecipe } from 'src/app/shared/interfaces/recipe';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {

  user!: IUser | undefined
  recipes: IRecipe[] | any
  showPrograms: boolean = false;
  noPrograms: boolean = false;



  constructor(private userService: UserService,
    private recipeService: RecipeService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loadUser()
    setTimeout(() => { this.fetchUserRecipes() }, 500)
  }

  

  // loadProgramsHandler(): void {
  //   this.showPrograms = !this.showPrograms;

  //   if (this.recipes.length == 0) {
  //     this.recipes = true;
  //   }
  // }

  loadUser(): void {
    const id = localStorage.getItem('_id')
    if (!id) { return }
    this.user = undefined;
    this.userService.getUserById(id).subscribe(u => this.user = u)
  }

  fetchUserRecipes(): void {
    this.recipes = undefined;
    if (!this.user) { return }
    const id = this.user._id
    this.recipeService.loadUserRecipes(id).subscribe(r => this.recipes = r)
  }
}





