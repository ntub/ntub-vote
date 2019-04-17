import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PresidentComponent } from './president.component';

describe('PresidentComponent', () => {
  let component: PresidentComponent;
  let fixture: ComponentFixture<PresidentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresidentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PresidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
