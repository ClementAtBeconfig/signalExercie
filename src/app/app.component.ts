import {
  Component,
  computed,
  effect,
  Inject,
  Injectable,
  InjectionToken,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterService } from './service/counter/counter.service';
import { TimerService } from './service/timer/timer.service';
import { GateauService } from './service/gateau/gateau.service';
import { Button } from 'primeng/button';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { player } from './models/player.models';
import { TableModule } from 'primeng/table';
import { PLAYER_TOKEN } from './models/player.models';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Button,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TooltipModule,
    ToolbarModule,
    SplitButtonModule,
    CommonModule,
    InputSwitchModule
    
  ],
  providers: [{ provide: PLAYER_TOKEN, useValue: '' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent implements OnInit {
  darkmode=false;
  buttonContainer = false;
  title = 'signalExercie';
  label = 'Démarrer';
  calculCPS: any;
  pseudoUser = '';
  button: HTMLButtonElement | undefined;
  dialogFormGroup!: FormGroup;
  items: MenuItem[] | undefined;

  listPlayer: player[] = [];

  timeout = computed(() => this.timer() === 10);
  listLocalPlayer: player[] = [];

  constructor(
    @Inject(PLAYER_TOKEN)
    public playerModel: player,
    public formBuilder: FormBuilder,
    private counterService: CounterService,
    private timerService: TimerService,
    private gateauService: GateauService
  ) {
    effect(() => {
      this.button = document.getElementById(
        'SpeedTestButton'
      ) as HTMLButtonElement;

      if (this.timeout()) {
        console.log(this.pseudoUser);
        this.button.disabled = true;
        this.endSpeedTestButton = true;
        this.playerModel = {
          pseudo: this.pseudoUser,
          score: this.counter().toString(),
          cps: this.calculCPS().toString(),
        };
        this.listPlayer.push(this.playerModel);
        localStorage.setItem('joueur', JSON.stringify(this.listLocalPlayer));
      }
    });
  }
  ngOnInit(): void {
    this.items = [
      {
          label: 'Supprimer la base local',
          icon: 'pi pi-trash'
      },
      {
          label: 'Changer de pseudo',
          icon: 'pi pi-address-book'
      }
  ];
    this.dialogFormGroup = this.formBuilder.group({
      pseudoUser: new FormControl('', Validators.required),
    });
    var playerLocal = localStorage.getItem('joueur');
    this.listPlayer.push(JSON.parse(playerLocal!));
  }
  speedTestButtonStart = false;
  endSpeedTestButton = false;
  get counter() {
    return this.counterService.getCounter();
  }

  get timer() {
    return this.timerService.getTimer();
  }

  handleDarkModeChange(darkmode:boolean){
    console.log(darkmode)
  }

  increment() {
    this.counterService.increment();
  }

  decrement() {
    this.counterService.decrement();
  }

  reset() {
    this.counterService.reset();
  }

  resetTimer() {
    this.timerService.resetTimer();
  }

  startTimer() {
    this.timerService.StartTimer(this.timer);
  }

  stopTimer() {
    this.timerService.StopTimer();
  }
  handleCalculCPS() {
    this.calculCPS = computed(() => this.counter() / this.timer());
  }

  startSpeedTestClicker() {
    if (this.button != undefined) {
      this.button.disabled = false;
    }
    this.handleCalculCPS();
    this.reset();
    this.resetTimer();
    this.speedTestButtonStart = true;
    this.endSpeedTestButton = false;
    this.startTimer();
  }

  clickEmitTestSpeed() {
    this.increment();
  }

  handleDisplayButtonContainer() {
    if (this.buttonContainer) {
      this.buttonContainer = false;
    } else {
      this.buttonContainer = true;
    }
  }
}
