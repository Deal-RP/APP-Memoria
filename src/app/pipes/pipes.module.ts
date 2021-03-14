import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisorPipe } from './divisor.pipe';

@NgModule({
  declarations: [
    DivisorPipe
  ],
  exports: [
    DivisorPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }