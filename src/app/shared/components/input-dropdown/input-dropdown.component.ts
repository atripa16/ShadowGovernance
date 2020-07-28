import { AfterViewChecked, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-dropdown',
  templateUrl: './input-dropdown.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: InputDropdownComponent,
    multi: true
  }],
  styleUrls: ['./input-dropdown.component.scss']
})

export class InputDropdownComponent implements OnInit, ControlValueAccessor, AfterViewChecked {


  @Input() label = '';
  @Input() name = '';
  @Input() defaultKey: any;
  @Input() required: true | false = false;
  onChange: (value: any) => void;
  onTouched: () => void;
  @Input() options: any[] = [];
  searchValue = '';
  showOptions: any[] = [];
  @Input() placeholder = '';
  @Input() disabled: boolean;

  constructor(
    private changeD: ChangeDetectorRef,
    public elRef: ElementRef,
    private renderer: Renderer2
  ) {

  }

  ngOnInit(): void {

  }

  writeValue(value: string): void {
    if (!this.options) {
      this.options = [];
    }
    let isContainVal = true;
    this.searchValue = value;
    this.options.forEach(choice => {
      if (choice.description === this.searchValue) {
        isContainVal = false;
        this.onChange({ code: choice.code, description: value });
      }
    });
    if (this.onChange !== undefined && this.onChange != null) {
      if (isContainVal) {
        this.onChange({ code: this.defaultKey, description: value });
      }
    }
  }

  ngAfterViewChecked(): void {
    this.changeD.detectChanges();
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

  searchValueChange(value) {
    if (value !== undefined && value !== null) {
      this.writeValue(value);
    }
  }

  selectChoice(choice) {
    if (choice.description) {
      this.writeValue(choice);
      this.removeShowOptions();
    } else {
      this.writeValue(choice);
    }
  }

  addShowOptions() {
    this.options.forEach(choice => {
      this.showOptions.push(choice);
    });
  }

  removeShowOptions() {
    this.showOptions = [];
  }

  @HostListener('document:click', ['$event'])
  hideTheOptionsList(event) {
    if (!this.elRef.nativeElement.querySelector('.options-control') !== undefined
      && this.elRef.nativeElement.querySelector('input') !== undefined
      && this.elRef.nativeElement.querySelector('input') !== null
      && this.elRef.nativeElement.querySelector('.options-control') !== null) {
      if (!this.elRef.nativeElement.querySelector('.options-control').contains(event.target)
        && !this.elRef.nativeElement.querySelector('input').contains(event.target)) {
        this.removeShowOptions();
      }
    }
  }

}
