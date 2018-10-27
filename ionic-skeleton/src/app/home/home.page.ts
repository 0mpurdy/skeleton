import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public homeForm: FormGroup;
  private disableEmail: Subject<boolean>;

  constructor(private fb: FormBuilder) { }

  public ngOnInit() {
    this.homeForm = this.fb.group({
      email: '',
      notEmail: { value: 'something', disabled: true},
    });

    this.disableEmail = new Subject();
    this.disableEmail
      .pipe(distinctUntilChanged())
      .subscribe(this.setNotEmailDisabled);

    this.homeForm.valueChanges
      .pipe(debounceTime(100))
      .subscribe(this.handleFormChanges);
  }

  private setNotEmailDisabled = (disable: boolean) => {
    if (disable) {
      this.homeForm.get('notEmail').disable();
    } else {
      this.homeForm.get('notEmail').enable();
    }
  }

  private handleFormChanges = (changes: any) => {
    console.log('changes', changes);
    this.disableEmail.next(!!this.homeForm.get('email').value);
  }
}
