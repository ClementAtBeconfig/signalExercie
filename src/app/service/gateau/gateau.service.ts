import { computed, effect, Injectable, signal, Signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GateauService {
  readonly count= signal(0);
  constructor() {

    
    effect(()=>{
      console.log(`The count is: ${this.count()}`)
    })
    
  } 
  makegateau() {
    const nombreDeGateaux = 3;
    const quantiteDeFarineParGateau = 200;
    const quantiteDeSucreParGateau = 100;

    const quantiteTotaleDeFarine = computed(
      () => nombreDeGateaux * quantiteDeFarineParGateau
    );
    const quantiteTotaleDeSucre = computed(
      () => nombreDeGateaux * quantiteDeSucreParGateau
    );
    const showCount = signal(false);
    this.count.set(5)
    const conditionalCount = computed(() => {
      if (showCount()) {
        return `The count is ${this.count()}.`;
      } else {
        return 'Nothing to see here!';
      }
    });

    console.log(this.count())
    // console.log(doubleCount())
  }
}
