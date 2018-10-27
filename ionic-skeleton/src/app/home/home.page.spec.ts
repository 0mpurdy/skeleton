import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), ReactiveFormsModule],
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have disabled notEmail when there are characters in email', () => {
    // arrange
    // act
    component.homeForm.get('email').setValue('something');
    // assert
    expect(component.homeForm.get('notEmail').disabled).toBe(true);
  });

  it('should have enabled notEmail when there are no characters in email', fakeAsync(() => {
    // arrange
    fixture.detectChanges();
    // act
    component.homeForm.get('email').setValue('');
    console.log('ticking');
    tick(200);
    fixture.detectChanges();
    // assert
    expect(component.homeForm.get('notEmail').disabled).toBe(false);
  }));

  it('should have the same date', fakeAsync(() => {
    // arrange
    const startTime = new Date();
    // act
    const endTime = new Date();
    // assert
    expect(startTime).toEqual(endTime);
  }));

  it('should have different dates', fakeAsync(() => {
    // arrange
    const startTime = new Date();
    tick(100);
    // act
    const endTime = new Date();
    // assert
    expect(startTime).not.toEqual(endTime);
  });
});
