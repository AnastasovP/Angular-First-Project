import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IProgram } from 'src/app/shared/interfaces/program';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  currentProgram: IProgram | undefined;
  userId = localStorage.getItem('_id');
  isLiked!: boolean;

  refreshProgram$ = new BehaviorSubject<boolean>(true);

  get isOwner(): boolean {
    return this.userId === this.currentProgram?.owner._id
  }

   

  constructor(
    private programService: ProgramService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }


  ngOnInit(): void {
    this.fetchCurrentProgram();

    
    // setTimeout(() => {
    //   (this.isLiked as any) = this.currentProgram?.likes.includes(this.userId + '')
    // }, 100);

    //navigate to 404 if Program dont exist!
    // setTimeout(() => {
    //   if (this.currentProgram === undefined) {
    //     this.router.navigate(['/404']);
    //     console.log('form setTimeout', this.currentProgram)
    //   }
    // }, 300)
  }

  fetchCurrentProgram(): void {
    this.currentProgram = undefined;
    const id = this.activatedRoute.snapshot.params['id'];

    this.programService.loadCurrentProgram(id).subscribe({
      next: program => {
      console.log('program', program);
      this.currentProgram = program
      },
      error: (err) => console.error(err)
    }
    );
    //this.refreshProgram$.pipe(switchMap(_ => this.programService.loadCurrentProgram(id))).subscribe(program => this.currentProgram = program)
   
  }

  deleteHandler(): void {
    const id = this.currentProgram?._id
    if (!id) {
      throw new Error('Something went wrong, missing recipe');
    }
    const confirmed = confirm('Are you sure you want delete this recipe?')
    if (confirmed) {
      this.programService.deleteProgram(id).subscribe({
        next: () => {
          this.router.navigate(['/'])
        }
      });
    }
  }

  likeHandler(): void {
    const postId = this.currentProgram?._id;
    const userId = localStorage.getItem('_id');
    if(this.isLikedAlready) {
      return;
    }
    this.programService.like({ userId, postId }).subscribe({
      next: (program) => {
        this.isLiked = !this.isLiked
        this.router.navigate(['/programs']);
         
      },
    })

  }



  get isLikedAlready(): boolean {
    if (this.currentProgram) {
      return this.currentProgram.likes.includes(this.userId + '');
    }
    return false;
  }



  ngOnDestroy(): void {
    this.refreshProgram$.next(true);
    this.refreshProgram$.complete();
  }

}
