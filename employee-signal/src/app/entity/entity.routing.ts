import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntityComponent } from './pages/entity.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { EntityFormComponent } from './ui-components/entity-form.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: EntityComponent,
      },
      {
        path: "add-entity",
        component: EntityFormComponent
      }
    ]),
  ],
  exports: [RouterModule],
})
export class EntityRoutingModule {}
