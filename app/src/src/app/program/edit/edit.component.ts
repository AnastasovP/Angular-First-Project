import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IProgram } from 'src/app/shared/interfaces/program';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  currentProgram: IProgram | undefined;
  editPost: FormGroup

  constructor(private programService: ProgramService, private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
    this.fetchCurrentProgram();
    this.editPost = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      ingredients: ['', [Validators.required, Validators.maxLength(200)]],
      category: [''],
      
    })
  }

  ngOnInit(): void {

  }

  fetchCurrentProgram(): void {
    this.currentProgram = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    this.programService.loadCurrentProgram(id).subscribe(program => {
      this.currentProgram = program;
      this.editPost.patchValue({
        name: this.currentProgram.name,
        description: this.currentProgram.description,
        image: this.currentProgram.image,
        ingredients: this.currentProgram.ingredients,
        ctegory: this.currentProgram.category 
      })
    });
  };


  editProgramHandler(): void {
    const data = this.editPost.value;
    const id = this.currentProgram?._id
    if (data.invalid) {
      return
    };
    const confirmed = confirm('Are you sure you want to edit this Recipe?');
    if(confirmed){
      this.programService.editProgram(id, data).subscribe({
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
