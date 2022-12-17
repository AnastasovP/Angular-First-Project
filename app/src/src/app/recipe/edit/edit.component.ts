import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from 'src/app/shared/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  currentRecipe: IRecipe | undefined;
  editPost: FormGroup

  constructor(private recipeService: RecipeService, private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
    this.fetchCurrentRecipe();
    this.editPost = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      ingredients: ['', [Validators.required, Validators.maxLength(200)]],
      category: [''],
      
    })
  }

  ngOnInit(): void {

  }

  fetchCurrentRecipe(): void {
    this.currentRecipe = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.recipeService.loadCurrentRecipe(id).subscribe(recipe => {
      this.currentRecipe = recipe;
      this.editPost.patchValue({
        name: this.currentRecipe.name,
        description: this.currentRecipe.description,
        imageUrl: this.currentRecipe.imageUrl,
        ingredients: this.currentRecipe.ingredients,
        category: this.currentRecipe.category 
      })
    });
  };


  editProgramHandler(): void {
    const data = this.editPost.value;
    const id = this.currentRecipe?._id
    if (data.invalid) {
      return
    };
    const confirmed = confirm('Are you sure you want to edit this Recipe?');
    if(confirmed){
      this.recipeService.editRecipe(id, data).subscribe({
        next: () => {
          this.router.navigate(['programs', id])
        },
        error: (err) => {
          console.log(err.error.message)
        }
      })
    }

  }

}
