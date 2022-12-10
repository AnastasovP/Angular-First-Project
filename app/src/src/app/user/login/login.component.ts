import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) 
  {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  loginHandler(): void {
    if (this.form.invalid) { return };
    const { email, password } = this.form.value;
    this.userService.login({ email, password }).subscribe({
      next: (result) => {
        this.router.navigate(['/programs'])
        localStorage.setItem('_id', result._id )
        
      }
    })
  }

}
