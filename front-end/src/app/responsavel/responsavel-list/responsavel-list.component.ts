import { Component, OnInit } from '@angular/core';
import { ResponsavelService, Responsavel } from '../responsavel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-responsavel-list',
  templateUrl: './responsavel-list.component.html',
  styleUrls: ['./responsavel-list.component.scss']
})
export class ResponsavelListComponent implements OnInit {

  responsaveis : Responsavel[] = [] as Responsavel[]

  displayedColumns : string[] = ['nome', 'cpf', 'endereco', 'telefone', 'email', 'editar', 'excluir']

  constructor(
    private responsavelSrv : ResponsavelService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.responsaveis = await this.responsavelSrv.listar()
    console.log(this.responsaveis)
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
        await this.responsavelSrv.excluir(id)
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
