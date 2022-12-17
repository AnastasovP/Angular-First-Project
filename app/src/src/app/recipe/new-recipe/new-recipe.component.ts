import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss']
})
export class NewRecipeComponent implements OnInit {


  formPost: FormGroup

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private router: Router) {
    this.formPost = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      ingredients: ['', [Validators.required, Validators.maxLength(200)]],
      category: [''],
      
    })
  }

  ngOnInit(): void {
  }

 
  postProgramHandler(): void {
    const data = this.formPost.value;
    data.owner = sessionStorage.getItem('_id');
    //console.log('data before subscribe', data)
    if (this.formPost.invalid) { return; }
    this.recipeService.postRecipe(data).subscribe({
      next: (result) => {
        //console.log('result from postProgram', result)
        this.router.navigate(['/programs']); //, result._id
      },
      error: (err) => {
        console.error(err.error.message)
      }
    })
  } 

}
