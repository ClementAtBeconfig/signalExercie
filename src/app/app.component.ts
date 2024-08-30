import {
  Component,
  computed,
  effect,
  Inject,
  Injectable,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CounterService } from './service/counter/counter.service';
import { TimerService } from './service/timer/timer.service';
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
import { MenuItem, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
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
    InputSwitchModule,
    RouterOutlet,
    ToastModule
  ],
  providers: [{ provide: PLAYER_TOKEN, useValue: '' } , MessageService ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
@Injectable({
  providedIn: 'root',
})
export class AppComponent implements OnInit {
  darkmode = false;
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
    private messageService:MessageService,
    private router:Router,
    public formBuilder: FormBuilder,
    private counterService: CounterService,
    private timerService: TimerService
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
        this.handleAddDataLocalStorage(this.listPlayer)
      }
    });
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Supprimer la base local',
        icon: 'pi pi-trash',
        command: () => {
          this.handleClearLocalBase();
        },
      },
      {
        label: 'Paramètre',
        icon: 'pi pi-cog',
        command:()=>{
          
          this.router.navigate(["settings"])
        }
      },
    ];
    this.dialogFormGroup = this.formBuilder.group({
      pseudoUser: new FormControl('', Validators.required),
    });
    var playerLocal = localStorage.getItem('joueur');
    this.listPlayer.push(JSON.parse(playerLocal!));
    // console.log("test"+this.listPlayer);
  }
  speedTestButtonStart = false;
  endSpeedTestButton = false;

  get counter() {
    return this.counterService.getCounter();
  }

  get timer() {
    return this.timerService.getTimer();
  }

  handleDarkModeChange() {
    document.body.classList.toggle('dark-theme');
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

  handleAddDataLocalStorage(listPlayer: player[]) {
    console.log(listPlayer)
    localStorage.setItem('joueur', JSON.stringify(listPlayer));
  }

  handleClearLocalBase() {
    localStorage.clear();
    this.listPlayer=[]
    this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Base vidé avec succès !' });
  }
}
