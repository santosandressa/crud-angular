import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  exports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class AppMaterialModule { }
