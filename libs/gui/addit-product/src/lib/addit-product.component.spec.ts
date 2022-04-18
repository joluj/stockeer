import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditProductComponent } from './addit-product.component';

describe('AdditProductComponent', () => {
  let component: AdditProductComponent;
  let fixture: ComponentFixture<AdditProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditProductComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
