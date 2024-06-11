import { Component, OnInit, WritableSignal, inject, signal } from "@angular/core";
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
      isEmployeeAddModalOpen = false;
      isEmployeeDeleteModalOpen = false;
      entity: Entity | null = null;
      selectedEmployeeId: number | undefined = undefined;
      employeeIdToDelete: number | undefined = undefined;  

      

    ngOnInit(): void {
        
    }

}