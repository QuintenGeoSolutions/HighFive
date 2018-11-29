import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  form: FormGroup;
  GroepsbedrijfNaam = 'Cronos';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      'LastName': ['', [Validators.required]],
      'FirstName': ['', [Validators.required]],
      'Email': ['', [Validators.required, Validators.email]],
      'PhoneNumber': ['', [Validators.required]],
      'UserType': ['', [Validators.required]],
      'UserTypeOther': ['', [this.hoedanigheidAndersValidator]],
      'Organisation': ['', [Validators.required]],
      'Sex': ['', [Validators.required]],
      'WristBandNumber': ['', [Validators.required]],
    });
  }

  hoedanigheidAndersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const isAndere = control.get('UserType').value === 'Andere';
      if (isAndere) {
        const andereValue = control.get('UserTypeOther').value;
        return andereValue ? null : {'geenHoedanigheid': true};
      }
      control.get('UserType').reset('');
      return null;
    };
  }

  saveUser() {
    console.log(this.form.value);
    this.http.post('https://' + environment.bffUrl, this.form.value).subscribe(res => {

    });
    this.form.reset();
    this.form.get('UserType').setValue('');
  }
}
