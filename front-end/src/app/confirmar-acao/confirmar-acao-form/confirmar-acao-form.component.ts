import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ConfirmarAcaoService } from '../confirmar-acao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CuidadorService } from 'src/app/cuidador/cuidador.service';
import { MedicamentoService } from 'src/app/medicamento/medicamento.service';
import { HorarioService } from 'src/app/horario/horario.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';

interface ConfirmarAcao {
  cuidador: string
  data_hora: string
  medicamento: string
  horario: string
  confirmar_horario: boolean
  confirmar_medicamento: boolean
}

@Component({
  selector: 'app-confirmar-acao-form',
  templateUrl: './confirmar-acao-form.component.html',
  styleUrls: ['./confirmar-acao-form.component.scss']
})
export class ConfirmarAcaoFormComponent implements OnInit {

  title: string = 'Nova ação'

  confirmarAcao: any = []
  cuidadores: any = []
  medicamentos: any = []
  horarios: any = []

  constructor(
    private confirmarAcaoSrv : ConfirmarAcaoService,
    private cuidadorSrv : CuidadorService,
    private medicamentoSrv : MedicamentoService,
    private horarioSrv : HorarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    //Existe um parâmetro chamado :id?
    if(params['id']) {
      // É caso de atualização. é necessário consultar o back-end para recuperar o registro e colocá-lo para edição
      try {
        this.confirmarAcao = await this.confirmarAcaoSrv.obterUm(params['id'])
        this.title = 'Atualizando ação'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }

    // Entidades relacionadas
    try {
      this.cuidadores = await this.cuidadorSrv.listar()
      this.medicamentos = await this.medicamentoSrv.listar()
      this.horarios = await this.horarioSrv.listar()
    }
    catch(erro) {
      this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
    }
  }

  async voltar(form: NgForm) {
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/confirmarAcao']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
      let msg = 'Item de venda atualizado com sucesso'
      // Se existir o campo _id, é caso de atualização
      if(this.confirmarAcao._id) {
        await this.confirmarAcaoSrv.atualizar(this.confirmarAcao)
      }
      else {
        await this.confirmarAcaoSrv.novo(this.confirmarAcao)
        msg = 'Item de venda criado com sucesso'
      }
      this.snackBar.open(msg, 'Entendi', {duration: 5000})
      this.router.navigate(['/confirmar-acao'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }
  
}
