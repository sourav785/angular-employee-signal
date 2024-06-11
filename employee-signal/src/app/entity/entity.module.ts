import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityRoutingModule } from './entity.routing';
import { EntityFormComponent } from './ui-components/entity-form.component';
import { EntityComponent } from './pages/entity.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ EntityComponent, EntityFormComponent ],
  imports: [
    CommonModule,
    EntityRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class EntityModule {}
