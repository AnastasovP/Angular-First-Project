import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';




const routes: Routes = [
    {
        path: 'programs',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: RecipeListComponent
            },
            {
                path: ':id',
                component: DetailsComponent,
                canActivate: [AuthActivate],
                data: {
                    authenticationRequired: true,
                    authenticationFailureRedirectUrl: '/login'
                }

            },
            {
                path: 'edit/:id',
                component: EditComponent
            },
        ]
    },
    {
        path: 'add-program',
        component: NewRecipeComponent,
        canActivate: [AuthActivate],
        data: {
            authenticationRequired: true,
            authenticationFailureRedirectUrl: '/login'
        }
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipeRoutingModule { }
