import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
 exports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
 ]
})
export class AppMdModule { }
