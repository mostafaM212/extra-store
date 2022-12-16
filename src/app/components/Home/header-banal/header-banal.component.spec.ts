import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBanalComponent } from './header-banal.component';

describe('HeaderBanalComponent', () => {
  let component: HeaderBanalComponent;
  let fixture: ComponentFixture<HeaderBanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBanalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
