import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarrativeInputComponent } from './narrative-input.component';

describe('NarrativeInputComponent', () => {
  let component: NarrativeInputComponent;
  let fixture: ComponentFixture<NarrativeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NarrativeInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NarrativeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
