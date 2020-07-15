import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { IdosoService, Idoso } from '../idoso.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-idoso-form',
  templateUrl: './idoso-form.component.html',
  styleUrls: ['./idoso-form.component.scss']
})
export class IdosoFormComponent implements OnInit {

  title: string = 'Idoso'

  idoso : Idoso = {} as Idoso //Objeto vazio

  constructor(
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
        this.idoso = await this.idosoSrv.obterUm(params['id'])
        this.title = 'Atualizando idoso'
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
      this.router.navigate(['/idoso']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
      let msg = 'Cadastro do Idoso atualizado com sucesso'
      // Se existir o campo _id, é caso de atualização
      if(this.idoso._id) {
        await this.idosoSrv.atualizar(this.idoso)
      }
      else {
        await this.idosoSrv.novo(this.idoso)
        msg = 'Cadastro do Idoso criado com sucesso'
      }
      this.snackBar.open(msg, 'Entendi', {duration: 5000})
      this.router.navigate(['/idoso'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
