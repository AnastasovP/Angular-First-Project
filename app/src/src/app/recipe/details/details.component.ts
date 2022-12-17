import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IRecipe } from 'src/app/shared/interfaces/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  currentRecipe: IRecipe | undefined;
  userId = localStorage.getItem('_id');
  isLiked!: boolean;

  refreshProgram$ = new BehaviorSubject<boolean>(true);

  get isOwner(): boolean {
    return this.userId === this.currentRecipe?.owner._id
  }

   

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }


  ngOnInit(): void {
    this.fetchCurrentRecipe();

    
  }

  fetchCurrentRecipe(): void {
    this.currentRecipe = undefined;
    const id = this.activatedRoute.snapshot.params['id'];

    this.recipeService.loadCurrentRecipe(id).subscribe({
      next: recipe => {
      //console.log('recipe', recipe);
      this.currentRecipe = recipe
      },
      error: (err) => console.error(err)
    }
    );
    //this.refreshProgram$.pipe(switchMap(_ => this.programService.loadCurrentProgram(id))).subscribe(program => this.currentProgram = program)
   
  }

  deleteHandler(): void {
    const id = this.currentRecipe?._id
    if (!id) {
      throw new Error('Something went wrong, missing recipe');
    }
    const confirmed = confirm('Are you sure you want delete this recipe?')
    if (confirmed) {
      this.recipeService.deleteRecipe(id).subscribe({
        next: () => {
          this.router.navigate(['/'])
        }
      });
    }
  }

  likeHandler(): void {
    const postId = this.currentRecipe?._id;
    const userId = localStorage.getItem('_id');
    if(this.isLikedAlready) {
      return;
    }
    this.recipeService.like({ userId, postId }).subscribe({
      next: (recipe) => {
        this.isLiked = !this.isLiked
        this.router.navigate(['/programs']);
         
      },
    })

  }



  get isLikedAlready(): boolean {
    if (this.currentRecipe) {
      return this.currentRecipe.likes.includes(this.userId + '');
    }
    return false;
  }



  ngOnDestroy(): void {
    this.refreshProgram$.next(true);
    this.refreshProgram$.complete();
  }

}
