import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MemoriaComponent } from '../components/memoria/memoria.component';

interface personI{
  name: string;
  minutos: number;
  segundos: number;
  fallos: number;
  total: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  persons: personI[]  = [];
  name: string = "";

  constructor(private modalCtrl : ModalController) {}

  async jugar(){
    const modal = await this.modalCtrl.create({
      component: MemoriaComponent,
      componentProps:{
        name: this.name
      }
    });
    
    await modal.present();

    let data : personI = await (await modal.onDidDismiss()).data;
    if(data){
      this.persons.push(data);
      this.persons.sort(function(a, b) { return a.total - b.total});
    }
  }
}
