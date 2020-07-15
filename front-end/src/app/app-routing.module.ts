

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdosoListComponent } from './idoso/idoso-list/idoso-list.component';
import { IdosoFormComponent } from './idoso/idoso-form/idoso-form.component';
import { ConfirmarAcaoListComponent } from './confirmar-acao/confirmar-acao-list/confirmar-acao-list.component';
import { ConfirmarAcaoFormComponent } from './confirmar-acao/confirmar-acao-form/confirmar-acao-form.component';
import { CuidadorListComponent } from './cuidador/cuidador-list/cuidador-list.component';
import { CuidadorFormComponent } from './cuidador/cuidador-form/cuidador-form.component';
import { ResponsavelListComponent } from './responsavel/responsavel-list/responsavel-list.component';
import { ResponsavelFormComponent } from './responsavel/responsavel-form/responsavel-form.component';
import { MedicamentoListComponent } from './medicamento/medicamento-list/medicamento-list.component';
import { MedicamentoFormComponent } from './medicamento/medicamento-form/medicamento-form.component';
import { HorarioListComponent } from './horario/horario-list/horario-list.component';
import { HorarioFormComponent } from './horario/horario-form/horario-form.component';

const routes: Routes = [  
  {
      path: 'idoso',
      component: IdosoListComponent
  },
  {
    path: 'idoso/novo',
    component: IdosoFormComponent
  },
  {
    path: 'idoso/:id',
    component: IdosoFormComponent
  },
  {
    path: 'confirmarAcao',
    component: ConfirmarAcaoListComponent
  },
  {
    path: 'confirmarAcao/novo',
    component: ConfirmarAcaoFormComponent
  },
  {
    path: 'confirmarAcao/:id',
    component: ConfirmarAcaoFormComponent
  },
  {
    path: 'cuidador',
    component: CuidadorListComponent
  },
  {
    path: 'cuidador/novo',
    component: CuidadorFormComponent
  },
  {
    path: 'cuidador/:id',
    component: CuidadorFormComponent
  },
  {
    path: 'responsavel',
    component: ResponsavelListComponent
  },
  {
    path: 'responsavel/novo',
    component: ResponsavelFormComponent
  },
  {
    path: 'responsavel/:id',
    component: ResponsavelFormComponent
  },
  {
    path: 'medicamento',
    component: MedicamentoListComponent
  },
  {
    path: 'medicamento/novo',
    component: MedicamentoFormComponent
  },
  {
    path: 'medicamento/:id',
    component: MedicamentoFormComponent
  },
  {
    path: 'horario',
    component: HorarioListComponent
  },
  {
    path: 'horario/novo',
    component: HorarioFormComponent
  },
  {
    path: 'horario/:id',
    component: HorarioFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
