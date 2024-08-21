import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  constructor() { }
  private counter = signal(0);

  getCounter(){
    return this.counter;
  }

  increment(){
    this.counter.set(this.counter()+1)

  }

  reset(){
    this.counter.set(0)
  }

  decrement(){
    this.counter.set(this.counter()-1)
  }
}
