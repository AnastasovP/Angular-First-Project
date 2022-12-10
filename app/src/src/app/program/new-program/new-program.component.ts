import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProgramService } from '../program.service';

@Component({
  selector: 'app-new-program',
  templateUrl: './new-program.component.html',
  styleUrls: ['./new-program.component.scss']
})
export class NewProgramComponent implements OnInit {


  formPost: FormGroup

  constructor(
    private programService: ProgramService,
    private fb: FormBuilder,
    private router: Router) {
    this.formPost = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      ingredients: ['', [Validators.required, Validators.maxLength(200)]],
      category: [''],
      
    })
  }

  ngOnInit(): void {
  }

 
  postProgramHandler(): void {
    const data = this.formPost.value;
    data.owner = sessionStorage.getItem('_id');
    if (this.formPost.invalid) { return; }
    this.programService.postProgram(data).subscribe({
      next: (result) => {
        this.router.navigate(['/programs']); //, result._id
      },
      error: (err) => {
        console.error(err.error.message)
      }
    })
  } 

}
