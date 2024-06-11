export interface Entity {
    id?: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Mobile: string;
    DOB: Date;
    DOJ: Date;
    Password: string;
  }
export interface ColumnDetails{
    name: string;
    key: string;
    dataType: ColumnDataType;
    dateFormat?: string;
  }
  
export interface TableConfigurationDetails{
     showActionColumn: boolean;
     showEditButton: boolean;
     showDeleteButton: boolean; 
  }
  
export enum ColumnDataType{
    Text = "text",
    Number = "number",
    Date = "date"
  }