import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistBooksComponent } from './wishlist-books.component';

describe('WishlistBooksComponent', () => {
  let component: WishlistBooksComponent;
  let fixture: ComponentFixture<WishlistBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WishlistBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
