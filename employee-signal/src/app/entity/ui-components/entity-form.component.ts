import { Component, EventEmitter, OnInit, Output, effect, inject, input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { EntitySignalStore } from "../../signal-store/entity.signal-store";

@Component({
    selector: 'app-entity-form',
    templateUrl: './entity-form.component.html',
    styleUrls: ['./entity-form.component.scss']
})


export class EntityFormComponent implements OnInit{

    entityId = input<number | undefined>();

    entitySignalStore = inject( EntitySignalStore );

    @Output() closeModalOutputFromForm: EventEmitter<boolean> = new EventEmitter<boolean>();

    entityForm: FormGroup;

    constructor(private formBuilder: FormBuilder){
        this.entityForm = this.formBuilder.group({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            mobile: new FormControl('', [Validators.required]),
            dob: new FormControl('', [Validators.required]),
            doj: new FormControl('', [Validators.required]),
        });
        effect(() => {
            if(this.entitySignalStore.selectedEntity()){
              this.entityForm.patchValue(<any>this.entitySignalStore.selectedEntity());
            } else {
              this.entityForm.reset();
            }
          });
          effect(() => {
            if(this.entityId()){
              this.entitySignalStore.updateEntityId(<any>this.entityId());
            } else {
              this.entityForm.reset();
            }
          }, {allowSignalWrites: true});
        }

        ngOnInit(): void {
            const selectedId = this.entitySignalStore.entityID;
            this.entitySignalStore.getEntityById(selectedId);
          }

        onSave(): void {
        if (this.entityForm.valid) {
            if (this.entityId()) {
            this.entitySignalStore.editEntity({id: this.entityId(), ...this.entityForm.value});
            } else {
            this.entitySignalStore.addEntity(this.entityForm.value);
            }
        } else {
            this.entityForm.markAllAsTouched();
        }
        }
    
        closeModal(updateData: boolean) {
        this.closeModalOutputFromForm.emit(updateData);
        }    
    }


