import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionMeterComponent } from './completion-meter.component';

describe('CompletionMeterComponent', () => {
  let component: CompletionMeterComponent;
  let fixture: ComponentFixture<CompletionMeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletionMeterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletionMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
