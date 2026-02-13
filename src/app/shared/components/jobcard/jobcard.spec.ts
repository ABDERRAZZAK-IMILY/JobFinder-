import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jobcard } from './jobcard';

describe('Jobcard', () => {
  let component: Jobcard;
  let fixture: ComponentFixture<Jobcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jobcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Jobcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
