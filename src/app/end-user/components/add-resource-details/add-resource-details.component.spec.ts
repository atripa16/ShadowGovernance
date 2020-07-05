import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourceDetailsComponent } from './add-resource-details.component';

describe('AddResourceDetailsComponent', () => {
  let component: AddResourceDetailsComponent;
  let fixture: ComponentFixture<AddResourceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResourceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResourceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
