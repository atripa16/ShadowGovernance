import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgModel, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-date',
    templateUrl: './custom-date.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: CustomDateComponent,
        multi: true
    }],
    styleUrls: ['./custom-date.component.scss']
})

export class CustomDateComponent implements OnInit, ControlValueAccessor, AfterViewChecked {


    @Input() placeholder = '';
    @Input() label = '';
    @Input() required: true | false = false;
    @ViewChild('modelRef') modelRef: NgModel;
    onChange: (value: any) => void;
    onTouched: () => void;
    value: string;
    @Input() disabled: true | false;
    @Input() errorMessage = '';
    @Input() pattern = '';

    constructor(private _changeD: ChangeDetectorRef) {

    }
    ngAfterViewChecked(): void {
        this._changeD.detectChanges();
    }

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


}
