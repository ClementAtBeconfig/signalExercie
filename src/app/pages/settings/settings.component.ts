import { Component, Injectable } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      RouterOutlet,

    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss',
  })
  @Injectable({
    providedIn: 'root',
  })
  export class SettingsComponent {
  
}