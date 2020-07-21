import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-custom-dropdown',
    templateUrl: './custom-dropdown.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: CustomDropdownComponent,
        multi: true
    }],
    styleUrls: ['./custom-dropdown.component.scss']
})

export class CustomDropdownComponent implements OnInit, ControlValueAccessor {

    @Input() label = '';
    @Input() name=''
    @Input() required: true | false = false;
    @ViewChild('modelRef') modelRef: NgModel;
    onChange: (value: any) => void;
    onTouched: () => void;
    value: string;
    @Input() disabled: true | false;
    @Input() errorMessage: string = '';
    @Input() options: any[] = [];

    constructor(
        private _changeD: ChangeDetectorRef
    ) {

    }

    ngOnInit(): void {

    }

    ngAfterViewChecked(): void {
        this._changeD.detectChanges();
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


}
