import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { CuidadorService, Cuidador } from '../cuidador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cuidador-form',
  templateUrl: './cuidador-form.component.html',
  styleUrls: ['./cuidador-form.component.scss']
})
export class CuidadorFormComponent implements OnInit {

  title: string = 'Cadastrando Cuidador'

  cuidador: Cuidador = {} as Cuidador //Objeto vazio

  constructor(
    private cuidadorSrv: CuidadorService,
    private snackBar: MatSnackBar,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  async ngOnInit() {
    // Capturando os parâmetros da rota
    let params = this.actRoute.snapshot.params

    //Existe um parâmetro chamado :id?
    if (params['id']) {
      // É caso de atualização. é necessário consultar o back-end para recuperar o registro e colocá-lo para edição
      try {
        this.cuidador = await this.cuidadorSrv.obterUm(params['id'])
        this.title = 'Atualizando cuidador'
      }
      catch (erro) {
        this.snackBar.open(erro.message, 'Que pena!', { duration: 5000 })
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
      this.router.navigate(['/cuidador']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if (form.valid) {
      try {
        let msg = 'Cadastro do cuidador atualizado com sucesso'
        // Se existir o campo _id, é caso de atualização
        if (this.cuidador._id) {
          await this.cuidadorSrv.atualizar(this.cuidador)
        }
        else {
          await this.cuidadorSrv.novo(this.cuidador)
          msg = 'Cadastro do cuidador criado com sucesso'
        }
        this.snackBar.open(msg, 'Entendi', { duration: 5000 })
        this.router.navigate(['/cuidador'])
      }
      catch (erro) {
        this.snackBar.open(erro.message, 'Que pena!', { duration: 5000 })
      }
    }
  }
}
