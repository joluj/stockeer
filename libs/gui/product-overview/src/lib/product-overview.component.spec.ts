import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOverviewComponent } from './product-overview.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemOverviewComponent', () => {
  let component: ProductOverviewComponent;
  let fixture: ComponentFixture<ProductOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [ProductOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
