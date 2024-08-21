import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}

  private timer = signal(0);


  playtimer = true;

  getTimer() {
    return this.timer;
  }

  StartTimer(timer:  WritableSignal<number>) {
    if (this.playtimer) {
      if (timer() < 10) {
        setTimeout( () => {
          timer.set(timer() + 1);
          this.StartTimer(timer);
        }, 1000);
        
      }
    }
  }

  StopTimer() {
    this.playtimer = false;
  }

  resetTimer(){
    this.playtimer = true;
    this.timer.set(0)
  }
}
