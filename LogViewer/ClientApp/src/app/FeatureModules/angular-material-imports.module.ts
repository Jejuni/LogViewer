import { NgModule } from '@angular/core';
import {
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatTreeModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatToolbarModule
} from '@angular/material';
import { CdkTreeModule } from '@angular/cdk/tree';

@NgModule({
  declarations: [],
  imports: [],
  exports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    CdkTreeModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
  ]
})
export class AngularMaterialImportsModule { }
