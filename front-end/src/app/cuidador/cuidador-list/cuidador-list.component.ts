import { Component, OnInit } from '@angular/core';
import { CuidadorService, Cuidador } from '../cuidador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-cuidador-list',
  templateUrl: './cuidador-list.component.html',
  styleUrls: ['./cuidador-list.component.scss']
})
export class CuidadorListComponent implements OnInit {

  cuidadores : Cuidador[] = [] as Cuidador[]// Vetor vazio

  displayedColumns : string[] = ['nome', 'rg', 'cpf', 'data_nascimento', 'endereco', 'estado_civil', 'email', 'telefone', 'editar', 'excluir']

  constructor(
    private cuidadorSrv : CuidadorService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.cuidadores = await this.cuidadorSrv.listar()
    console.log(this.cuidadores)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este item?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir esta ação?')) {
    if(result) {
        
      try {
        await this.cuidadorSrv.excluir(id)
        this.ngOnInit() // Atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso.')
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
          { duration: 5000 });
      }
      catch(erro) {
        //alert('ERRO: não foi possível excluir esta ação.')
        this.snackBar.open('ERRO: não foi possível excluir este item.', 
          'Que pena!', { duration: 5000 });
      }
    }
  }

}
