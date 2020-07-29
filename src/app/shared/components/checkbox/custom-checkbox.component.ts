import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-customcheckbox',
    templateUrl: './custom-checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: CustomCheckboxComponent,
        multi: true
    }],
    styleUrls: ['./custom-checkbox.component.scss']
})

export class CustomCheckboxComponent implements OnInit, ControlValueAccessor, AfterViewChecked {


    @Input() label ;
    onChange: (value: any) => void;
    onTouched: () => void;
    value = false;
    @Output() changes = new EventEmitter<boolean>();
    @Input() disabled: true | false;

    constructor(private _changeD: ChangeDetectorRef) {

    }
    ngAfterViewChecked(): void {
        this._changeD.detectChanges();
    }

    ngOnInit(): void {

    }

    writeValue(value: boolean): void {
        this.value = value;
        this.changes.emit(value);
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
        this.changes.emit(value);
    }


}
