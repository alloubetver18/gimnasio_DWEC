import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css'],
})
export class AddEditUserComponent {
  provinces: string[] = [
    'Almeria',
    'Cádiz',
    'Córdoba',
    'Granada',
    'Huelva',
    'Jaen',
    'Málaga',
    'Sevilla',
  ];

  regForm: FormGroup;
  firstNameValue: string = '';
  constructor(private _fb: FormBuilder) {
    this.regForm = this._fb.group({
      firstName: '',
      lastName: '',
      gender: '1',
      province: 'Sevilla',
    });
  }

  sendRegForm() {
    if (this.regForm.valid) {
      console.log(this.regForm.value);
    }
  }
}
