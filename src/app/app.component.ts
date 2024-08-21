import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterService } from './service/counter/counter.service';
import { TimerService } from './service/timer/timer.service';
import { GateauService } from './service/gateau/gateau.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'signalExercie';
  label="Démarrer";
  constructor(private counterService:CounterService, private timerService:TimerService , private gateauService:GateauService)
  {}
  ngOnInit(): void {
    this.gateauService.makegateau()
  }
  speedTestButtonStart=false;
  endSpeedTestButton=false;
  get counter(){
    return this.counterService.getCounter();
  }

  get timer(){
    return this.timerService.getTimer();
  }
   
  increment(){
    this.counterService.increment();
  }

  decrement(){
    this.counterService.decrement();
  }

  reset(){
    this.counterService.reset();
  }

  resetTimer(){
    this.timerService.resetTimer();
  }

  startTimer(){
    this.timerService.StartTimer(this.timer);
  }

  stopTimer(){
    this.timerService.StopTimer();

  }

  StartSpeedTestClicker(){
    this.reset();
    this.resetTimer();
    this.speedTestButtonStart=true;
    this.endSpeedTestButton=false;
    this.startTimer();
  }

  clickEmitTestSpeed(){
    let button = document.getElementById("SpeedTestButton")as HTMLButtonElement;
    if(this.timer()===10){
      button.disabled=true;
      this.endSpeedTestButton=true;
    }
    this.increment();
  }

 
  



 

}

