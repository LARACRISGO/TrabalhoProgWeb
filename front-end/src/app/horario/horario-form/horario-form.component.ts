import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { IdosoService } from 'src/app/idoso/idoso.service';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-horario-form',
  templateUrl: './horario-form.component.html',
  styleUrls: ['./horario-form.component.scss']
})
export class HorarioFormComponent implements OnInit {

  title: string = 'Horario'

  horario : any = {}
  idosos: any = []

  constructor(
    private horarioSrv : HorarioService,
    private idosoSrv : IdosoService,
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
        this.horario = await this.horarioSrv.obterUm(params['id'])
        this.title = 'Atualizando alerta'
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
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
      this.router.navigate(['/horario']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
      let msg = 'Cadastro de alerta atualizado com sucesso!'
      // Se existir o campo _id, é caso de atualização
      if(this.horario._id) {
        await this.horarioSrv.atualizar(this.horario)
      }
      else {
        await this.horarioSrv.novo(this.horario)
        msg = 'Cadastro de alerta criado com sucesso!'
      }
      this.snackBar.open(msg, 'Entendi', {duration: 5000})
      this.router.navigate(['/horario'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
