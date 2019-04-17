import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouncilorComponent } from './councilor.component';

describe('CouncilorComponent', () => {
  let component: CouncilorComponent;
  let fixture: ComponentFixture<CouncilorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouncilorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouncilorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
