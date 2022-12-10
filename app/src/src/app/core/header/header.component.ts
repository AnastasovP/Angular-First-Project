import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }
  userId: string | null | undefined




  constructor(private userService: UserService, private router: Router) { }

  

  ngOnInit(): void {
    this.userId = localStorage.getItem('_id');

  }

  logoutHandler(): void {
    this.userService.logout().subscribe({
      next: () => {
        localStorage.removeItem('_id');
        this.router.navigate(['/']);
      },
      error: () => {
        //console.log(err.error.message);
      }
    })
  }

}
