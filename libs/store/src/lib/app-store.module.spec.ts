import { TestBed } from '@angular/core/testing';
import { AppStoreModule } from '@stockeer/store';

describe('StoreModule', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppStoreModule],
    }).compileComponents();
  });

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(AppStoreModule).toBeDefined();
  });
});
