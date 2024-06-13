import { Component, Output, EventEmitter, input, Input, TemplateRef, ContentChild } from '@angular/core';
import { ColumnDataType, ColumnDetails, Entity, TableConfigurationDetails } from '../../entity/models/entity.models';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {

  ColumnDataType = ColumnDataType;

  @ContentChild('editButtonTemplate') editButtonTemplate!: TemplateRef<any>;
  @ContentChild('deleteButtonTemplate') deleteButtonTemplate!: TemplateRef<any>;

  tableConfig = input.required<TableConfigurationDetails>();

  columnDetails = input.required<ColumnDetails[]>();
  rowDetails = input.required<any[]>();

  @Output() editEntity = new EventEmitter<Entity>();
  @Output() deleteEntity = new EventEmitter<number>();
}
