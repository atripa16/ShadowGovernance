import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-custom-input',
    templateUrl: './custom-input.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: CustomInputComponent,
        multi: true
    }],
    styleUrls: ['./custom-input.component.scss']
})

export class CustomInputComponent implements OnInit, ControlValueAccessor {

    @Input() placeholder = '';
    @Input() label = '';
    @Input() type = '';
    @Input() name='';
    @Input() required: true | false = false;
    @ViewChild('modelRef') modelRef: NgModel;
    onChange: (value: any) => void;
    onTouched: () => void;
    value: string;
    @Input() disabled: true | false;
    @Input() errorMessage = '';
    @Input() pattern = '';

    constructor(
        private _changeD: ChangeDetectorRef
    ) { }

    ngOnInit(): void {

    }

    writeValue(value: string): void {
        this.value = value;
    }

    registerOnTouched(onTouched: () => void) {
        this.onTouched = onTouched;
    }

    registerOnChange(onChange: any) {
        this.onChange = onChange;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    valueChange(value) {
        this.onChange(value);
    }

    ngAfterViewChecked(): void {
        this._changeD.detectChanges();
    }

}
