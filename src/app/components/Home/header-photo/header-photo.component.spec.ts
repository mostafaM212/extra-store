import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPhotoComponent } from './header-photo.component';

describe('HeaderPhotoComponent', () => {
  let component: HeaderPhotoComponent;
  let fixture: ComponentFixture<HeaderPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
