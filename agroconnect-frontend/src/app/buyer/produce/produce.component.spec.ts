import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseProduceComponent } from './browse-produce.component';

describe('BrowseProduceComponent', () => {
  let component: BrowseProduceComponent;
  let fixture: ComponentFixture<BrowseProduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseProduceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseProduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
