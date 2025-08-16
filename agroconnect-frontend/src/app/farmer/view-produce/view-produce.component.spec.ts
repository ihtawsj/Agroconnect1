import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProduceComponent } from './view-produce.component';

describe('ViewProduceComponent', () => {
  let component: ViewProduceComponent;
  let fixture: ComponentFixture<ViewProduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProduceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
