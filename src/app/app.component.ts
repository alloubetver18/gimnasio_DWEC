import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gimnasio';

  constructor(private _dialog: MatDialog) {}

  openAddEditUserDialog() {
    this._dialog.open(AddEditUserComponent);
  }
}
