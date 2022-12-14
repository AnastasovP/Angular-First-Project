import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramService } from 'src/app/program/program.service';
import { IProgram } from 'src/app/shared/interfaces/program';
import { IUser } from 'src/app/shared/interfaces/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})



export class ProfileComponent implements OnInit {

  user!: IUser | undefined
  programs: IProgram[] | any
  showPrograms: boolean = false;
  noPrograms: boolean = false;



  constructor(private userService: UserService,
    private programService: ProgramService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.loadUser()
    setTimeout(() => { this.fetchUserPrograms() }, 500)
  }

  

  // loadProgramsHandler(): void {
  //   this.showPrograms = !this.showPrograms;

  //   if (this.programs.length == 0) {
  //     this.noPrograms = true;
  //   }
  // }

  loadUser(): void {
    const id = localStorage.getItem('_id')
    if (!id) { return }
    this.user = undefined;
    this.userService.getUserById(id).subscribe(u => this.user = u)
  }

  fetchUserPrograms(): void {
    this.programs = undefined;
    if (!this.user) { return }
    const id = this.user._id
    this.programService.loadUserPrograms(id).subscribe(p => this.programs = p)
  }
}




// export class ProfileComponent {
//   programs: IProgram[] | any = null;
//   isEmpty: boolean = false;
//   user!: IUser | undefined

//   constructor(private userService: UserService, private programService: ProgramService) {
//     this.loadUser()
//     this.getMyPrograms()
//   }

//     loadUser(): void {
//     const id = localStorage.getItem('_id')
//     if (!id) { return }
//     this.user = undefined;
//     this.userService.getUserById(id).subscribe(u => this.user = u)
//   }

//   getMyPrograms() {
//     this.programs = undefined;
//     if (!this.user) { return }
//     const id = this.user._id
//     this.programService.loadUserPrograms(id).subscribe({
//       next: (value) => {
//         this.programs = value;
//         if(!value) {
//           this.isEmpty = true;
//         }
//       }
//     })
//   }
// }
