import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewProgramComponent } from './new-program/new-program.component';
import { ProgramService } from './program.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramListComponent } from './program-list/program-list.component';
import { DetailsComponent } from './details/details.component';
import { ProgramRoutingModule } from './program-routing.module';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    NewProgramComponent,
    ProgramListComponent,
    DetailsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgramRoutingModule,
  ],
  exports:[ ],
  providers:[
    ProgramService,
  ]
})
export class ProgramModule { }
