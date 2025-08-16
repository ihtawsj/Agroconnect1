import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceUploadComponent } from './produce-upload.component';

describe('ProduceUploadComponent', () => {
  let component: ProduceUploadComponent;
  let fixture: ComponentFixture<ProduceUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduceUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduceUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
