import { Component, OnInit, WritableSignal, effect, inject, signal } from "@angular/core";
import { EntitySignalStore } from "../../signal-store/entity.signal-store";
import { ColumnDataType, ColumnDetails, Entity, TableConfigurationDetails } from "../models/entity.models";
import { StateStatus } from "../../shared/model/shared.models";


@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.scss'],
})

export class EntityComponent implements OnInit{

    entitySignalStore = inject( EntitySignalStore );

    columnDetails: WritableSignal<ColumnDetails[]> = signal([
        {
          name: "ID",
          key: "id",
          dataType: ColumnDataType.Text,
        },
        {
          name: "First Name",
          key: "firstName",
          dataType: ColumnDataType.Text,
        },
        {
          name: "Last Name",
          key: "lastName",
          dataType: ColumnDataType.Text
        },
        {
          name: "Email",
          key: "email",
          dataType: ColumnDataType.Text
        },
        {
          name: "Mobile Number",
          key: "mobile",
          dataType: ColumnDataType.Text
        },
        {
          name: "DOB",
          key: "dob",
          dataType: ColumnDataType.Date,
          dateFormat: 'EEEE, MMMM d, y, h:mm:ss a zzzz'
        },
        {
          name: "DOJ",
          key: "doj",
          dataType: ColumnDataType.Date,
          dateFormat: 'EEEE, MMMM d, y, h:mm:ss a zzzz'
        }
      ]);

      tableConfig = signal<TableConfigurationDetails>({
        showActionColumn: true,
        showEditButton: true,
        showDeleteButton: true,
      });

      StateStatus = StateStatus;
      public rowDetails: WritableSignal<Entity[]> = signal([]);
      isEntityAddModalOpen = false;
      isEntityDeleteModalOpen = false;
      entity: Entity | null = null;
      selectedEntityId: number | undefined = undefined;
      entityIdToDelete: number | undefined = undefined;  
      
      constructor() {
        effect(() => {
          if(this.entitySignalStore.entities()?.length){
            this.rowDetails.set(this.entitySignalStore.entities());
            this.closeEntityAddModal();
          }
        }, {allowSignalWrites: true});
      }
    
      ngOnInit(): void {
        this.getEntityList();
      }
    
      private getEntityList(): void {
        this.entitySignalStore.loadEntities();
      }
    
      openEntityAddModal(entity?: Entity): void {
        this.selectedEntityId = entity?.id;
        this.isEntityAddModalOpen = true;
      }
    
      closeEntityAddModal(event?: boolean): void {
        this.entity = null;
        this.isEntityAddModalOpen = false;
      }
    
      openEntityDeleteModal(id: number | undefined): void {
        this.entityIdToDelete = id;
        this.isEntityDeleteModalOpen = true;
      }
    
      onDeleteConfirmed(confirmed: boolean): void {
        this.isEntityDeleteModalOpen = false;
        if (confirmed) {
          this.entitySignalStore.deleteEntity( <number>this.entityIdToDelete );
        }
        this.entityIdToDelete = undefined;
      }
}