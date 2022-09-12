import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedBooksComponent } from './completed-books.component';

describe('CompletedBooksComponent', () => {
  let component: CompletedBooksComponent;
  let fixture: ComponentFixture<CompletedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedBooksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
