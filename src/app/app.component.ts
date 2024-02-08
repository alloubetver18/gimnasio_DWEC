import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserService } from './service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from './shared/shared.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Result } from '../../../../../../Angula-Curso-2/03-pokeapp/src/app/poke/interfaces/pokeList.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'birthDate',
    'email',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getUsersList();
  }

  constructor(
    private _dialog: MatDialog,
    private _userService: UserService,
    private _sharedService: SharedService
  ) {}

  openAddEditUserDialog() {
    const dialogRef = this._dialog.open(AddEditUserComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.getUsersList();
    });
  }

  getUsersList(): any {
    this._userService.getUsersList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteUser(user: any): any {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._userService.deleteUser(user).subscribe({
          next: (res: any) => {
            this._sharedService.openSnackBar('Usuario Borrado.');
            this.getUsersList();
          },
          error: console.log,
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
