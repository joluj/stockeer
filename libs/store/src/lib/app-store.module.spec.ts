import { TestBed } from '@angular/core/testing';
import { AppStoreModule } from '..';

describe('StoreModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreModule],
    }).compileComponents();
  });

  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(AppStoreModule).toBeDefined();
  });
});
