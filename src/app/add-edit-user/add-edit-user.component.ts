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
      birthdate: '',
      email: '',
      telephone: '',
      gender: '1',
      province: 'Sevilla',
      passw: '',
      repeatpassw: '',
      observations: '',
    });
  }

  sendRegForm() {
    if (this.regForm.valid) {
      alert(
        'Usuario registrado correctamente. Por favor, confirme con el Email que le hemos mandado a su dirección de Email.'
      );
      console.log(this.regForm.value);
    }
  }

  clearInput(field: string) {
    this.regForm.get(field)?.setValue('');
  }
}
