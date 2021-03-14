import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MemoriaComponent } from './memoria/memoria.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  entryComponents: [],
  declarations: [
    MemoriaComponent
  ],
  exports: [
    MemoriaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }