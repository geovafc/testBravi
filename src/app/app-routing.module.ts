import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'current',
    component: CurrentWeatherComponent,
    data: { title: 'Current Weather' }
  },
  { path: '',
    redirectTo: '/current',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {

 }
