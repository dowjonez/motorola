import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageDisplayComponent } from './components/image-display/image-display.component';


const routes: Routes = [
  {
    path:'**', component: ImageDisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
