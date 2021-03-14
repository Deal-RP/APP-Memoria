import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

interface itemI {
  id: number;
  name: string;
  show: boolean;
  disabled: boolean;
}

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss'],
})
export class MemoriaComponent implements OnInit {

  @Input() name: string;
  rowImages : itemI[] = [];
  result: any;
  lastCard = -1;
  wait = false;
  aciertos = 0;
  fallos = 0;
  interval;
  minutes = 0;
  seconds  = 0;

  constructor(
    private modalCtrl: ModalController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.startTimer();
    this.loadMemoria();
  }

  loadMemoria(){
    const variables = [
      "american-football-outline",
      "basketball-outline",
      "bowling-ball-outline",
      "baseball-outline",
      "bicycle-outline",
      "game-controller-outline",
      "headset-outline",
      "bonfire-outline",
      "skull-outline",
      "barbell-outline"
    ];
    while(variables.length > 0){
      let name = variables.pop();
      this.rowImages.splice(
        (Math.random() * (this.rowImages.length - 0) + 0), 
        0, 
        {
          id: 0,
          name,
          show: false,
          disabled: false,
        }
      );
      this.rowImages.splice(
        (Math.random() * (this.rowImages.length - 0) + 0), 
        0, 
        {
          id: 0,
          name,
          show: false,
          disabled: false,
        }
      );
    }
    
    this.rowImages.forEach((value : itemI, index )=> {
      value.id = index;
    });
    console.log(this.rowImages);
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.seconds == 60){
        this.seconds = 0;
        this.minutes++;
      }
      else{
        this.seconds++;
      }
    },1000)
  }

  selected(card : itemI){
    if(!card.disabled && !this.wait){
      if(this.lastCard !== -1){
        let last = this.rowImages.find(x => x.id === this.lastCard);
        card.show = true;

        if(card.name === last.name){
          card.disabled = true;
          this.aciertos++;
          this.presentToast("Combinacion correcta");
          if(this.aciertos === 10){
            this.result = {
              name: this.name,
              minutos: this.minutes,
              segundos: this.seconds,
              fallos: this.fallos,
              total: this.fallos + (this.minutes * 60) + (this.seconds),
            };
          }
        }
        else{
          this.fallos++;
          this.wait = true;
          setTimeout(() => { 
            card.show = false;
            last.show = false;
            last.disabled = false;
            this.wait = false;
          }, 3000);
          this.presentToast("Combinacion incorrecta");
        }
        this.lastCard = -1;
      }
      else{
        this.lastCard = card.id;
        card.show = true;
        card.disabled = true;
      }
    }
  }

  salir(){
    this.modalCtrl.dismiss(this.result);
  }

  async presentToast( message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }
}
