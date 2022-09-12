import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofBooksComponent } from './listof-books.component';

describe('ListofBooksComponent', () => {
  let component: ListofBooksComponent;
  let fixture: ComponentFixture<ListofBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListofBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListofBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
