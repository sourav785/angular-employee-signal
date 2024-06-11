import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityComponent } from './pages/entity.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EntityComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class EntityRoutingModule {}
