import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MainToolbarComponent } from './ui/main-toolbar/main-toolbar.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { MainFooterComponent } from './ui/main-footer/main-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/**** Datas em português no MatDatepicker  ****/

// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { ConfirmarAcaoListComponent } from './confirmar-acao/confirmar-acao-list/confirmar-acao-list.component';
import { ConfirmarAcaoFormComponent } from './confirmar-acao/confirmar-acao-form/confirmar-acao-form.component';
import { IdosoListComponent } from './idoso/idoso-list/idoso-list.component';
import { IdosoFormComponent } from './idoso/idoso-form/idoso-form.component';
import { CuidadorListComponent } from './cuidador/cuidador-list/cuidador-list.component';
import { ResponsavelListComponent } from './responsavel/responsavel-list/responsavel-list.component';
import { CuidadorFormComponent } from './cuidador/cuidador-form/cuidador-form.component';
import { ResponsavelFormComponent } from './responsavel/responsavel-form/responsavel-form.component';
import { MedicamentoListComponent } from './medicamento/medicamento-list/medicamento-list.component';
import { MedicamentoFormComponent } from './medicamento/medicamento-form/medicamento-form.component';
import { HorarioListComponent } from './horario/horario-list/horario-list.component';
import { HorarioFormComponent } from './horario/horario-form/horario-form.component';


/**********************************************/

@NgModule({
  declarations: [
    AppComponent,
    MainToolbarComponent,
    MainMenuComponent,
    MainFooterComponent,
    ConfirmDlgComponent,
    ConfirmarAcaoListComponent,
    ConfirmarAcaoFormComponent,
    IdosoListComponent,
    IdosoFormComponent,
    CuidadorListComponent,
    ResponsavelListComponent,
    CuidadorFormComponent,
    ResponsavelFormComponent,
    MedicamentoListComponent,
    MedicamentoFormComponent,
    HorarioListComponent,
    HorarioFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
    /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule
    /**********************************************/
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
    /**********************************************/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
