import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedService } from '../shared/shared.service';

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
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<AddEditUserComponent>,
    private _sharedService: SharedService
  ) {
    this.regForm = this._fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      gender: [null, [Validators.required]],
      province: [null, [Validators.required]],
      passw: ['', [Validators.required]],
      repeatpassw: ['', [Validators.required]],
      observations: [''],
    });
  }

  submitRegForm() {
    if (this.regForm.valid && this.checkPasswrd()) {
      this._userService.addUser(this.regForm.value).subscribe({
        next: (val: any) => {
          this._sharedService.openSnackBar(
            'Usuario registrado correctamente. Por favor, confirme con el Email que le hemos mandado a su dirección de Email.'
          );
          this._dialogRef.close();
        },
        error(err) {
          console.log(err);
        },
      });
      console.log(this.regForm.value);
    } else {
      this._sharedService.openSnackBar('Error de registro');
    }
  }

  clearInput(field: string) {
    this.regForm.get(field)?.setValue('');
  }

  checkPasswrd() {
    if (
      this.regForm.get('passw')?.value == this.regForm.get('repeatpassw')?.value
    ) {
      return true;
    } else {
      return false;
    }
  }
}
