import { InjectionToken } from "@angular/core";

export interface player{
    pseudo:string,
    score:string,
    cps:string

}

export const PLAYER_TOKEN = new InjectionToken<player>('PlayerToken');