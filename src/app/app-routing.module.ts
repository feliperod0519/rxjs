import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StopWatchComponent } from './stop-watch/stop-watch.component'
import { DnDComponent } from './dn-d/dn-d.component';
import { OtherOperatorsComponent } from './other-operators/other-operators.component';
import { PigLatinComponent } from './pig-latin/pig-latin.component';
import { MosaicComponent } from './mosaic/mosaic.component';

const routes: Routes = [{path:'stopWatch', component:StopWatchComponent},
                        {path:'DnD', component:DnDComponent},
                        {path:'Other', component: OtherOperatorsComponent},
                        {path:'PigLatin', component: PigLatinComponent},
                        {path:'mosaic', component: MosaicComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
