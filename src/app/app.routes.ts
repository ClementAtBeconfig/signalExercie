import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    // {path:"", component:AppComponent},
    {path:"settings", component:SettingsComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
