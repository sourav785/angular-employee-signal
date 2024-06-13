import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntityModule } from './entity/entity.module';
import { EntityFormComponent } from './entity/ui-components/entity-form.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: EntityModule,
  // },
  // {
  //   path: 'add-entity',
  //   component: EntityFormComponent,
  // }
  
  {
    path: '',
    loadChildren: () =>
      import('./entity/entity.module').then((m) => m.EntityModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
