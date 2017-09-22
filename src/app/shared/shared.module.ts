import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownService } from './services/dropdown/dropdown.service';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { FormDebugComponent } from './form-debug/form-debug.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent
  ],
  exports:[
    FormDebugComponent,
    CampoControlErroComponent
  ],
  providers: [
    DropdownService
  ]
})
export class SharedModule { }
