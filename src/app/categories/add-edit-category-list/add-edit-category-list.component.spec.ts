import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCategoryListComponent } from './add-edit-category-list.component';

describe('AddEditCategoryListComponent', () => {
  let component: AddEditCategoryListComponent;
  let fixture: ComponentFixture<AddEditCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCategoryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
