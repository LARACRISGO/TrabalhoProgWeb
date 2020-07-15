import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ResponsavelService , Responsavel} from '../responsavel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-responsavel-form',
  templateUrl: './responsavel-form.component.html',
  styleUrls: ['./responsavel-form.component.scss']
})
export class ResponsavelFormComponent implements OnInit {

  title: string = 'Responsavel'

  responsavel : Responsavel = {} as Responsavel //Objeto vazio

  constructor(
    private responsavelSrv : ResponsavelService,
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
        this.responsavel = await this.responsavelSrv.obterUm(params['id'])
        this.title = 'Atualizando responsavel'
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
      this.router.navigate(['/responsavel']); // Retorna à listagem
    }
  }

  async salvar(form: NgForm) {
    // Só tenta salvar se o form for válido
    if(form.valid) {
      try {
      let msg = 'Cadastro do responsavel atualizado com sucesso'
      // Se existir o campo _id, é caso de atualização
      if(this.responsavel._id) {
        await this.responsavelSrv.atualizar(this.responsavel)
      }
      else {
        await this.responsavelSrv.novo(this.responsavel)
        msg = 'Cadastro do responsavel criado com sucesso'
      }
      this.snackBar.open(msg, 'Entendi', {duration: 5000})
      this.router.navigate(['/responsavel'])
      }
      catch(erro) {
        this.snackBar.open(erro.message, 'Que pena!', {duration: 5000})
      }
    }
  }

}
