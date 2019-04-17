import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteCompleteComponent } from './vote-complete.component';

describe('VoteCompleteComponent', () => {
  let component: VoteCompleteComponent;
  let fixture: ComponentFixture<VoteCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
