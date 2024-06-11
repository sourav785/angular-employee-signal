import { Component, EventEmitter, Output, input } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'app-entity-form',
    templateUrl: './entity-form.component.html',
    styleUrls: ['./entity-form.component.scss']
})


export class EntityFormComponent {

    entityId = input.required<number | undefined>();

    @Output() onCloseModel = new EventEmitter();

    entityForm: FormGroup;

    constructor(private formBuilder: FormBuilder){
        this.entityForm = this.formBuilder.group({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            mobile: new FormControl('', [Validators.required]),
            dob: new FormControl('', [Validators.required]),
            doj: new FormControl('', [Validators.required]),
        })
    }

    onSave():void {
        
    }
}