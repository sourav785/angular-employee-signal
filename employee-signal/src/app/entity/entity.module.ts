import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntityRoutingModule } from './entity.routing';
import { EntityFormComponent } from './ui-components/entity-form.component';
import { EntityComponent } from './pages/entity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../shared/modal/modal.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { TableComponent } from '../shared/table/table.component';



@NgModule({
  declarations: [ EntityComponent, EntityFormComponent ],
  imports: [
    //CommonModule,
    EntityRoutingModule,
    ReactiveFormsModule,
    ModalComponent,
    LoaderComponent,
    TableComponent
  ],
  providers: [],
})
export class EntityModule {}
