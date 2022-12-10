import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CustomValidationService } from '../validator/custom-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup
  constructor(private customValidator: CustomValidationService,private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]],
    },{
      validator: [this.customValidator.passwordMatchValidator('password','rePassword')]
    },);
  }


  ngOnInit(): void {
    
  }

  registerHandler(): void {
    const data = this.form.value;
    if (this.form.invalid) { return; }
    this.userService.register(this.form.value).subscribe({
      next: (result) => {
        localStorage.setItem('_id', result._id )
        this.router.navigate(['/']);
      }
    })
  }

}
