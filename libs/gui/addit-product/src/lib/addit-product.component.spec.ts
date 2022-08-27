import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditProductComponent } from './addit-product.component';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Provider } from '@angular/core';

describe('AdditProductComponent', () => {
  let component: AdditProductComponent;
  let fixture: ComponentFixture<AdditProductComponent>;

  beforeEach(async () => {
    const p: Provider = {
      provide: AndroidPermissions,
      useValue: undefined,
    };

    await TestBed.configureTestingModule({
      declarations: [AdditProductComponent],
      providers: [p],
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
