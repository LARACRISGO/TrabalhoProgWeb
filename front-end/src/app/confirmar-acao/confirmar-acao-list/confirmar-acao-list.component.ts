import { Component, OnInit } from '@angular/core';
import { ConfirmarAcaoService } from '../confirmar-acao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-confirmar-acao-list',
  templateUrl: './confirmar-acao-list.component.html',
  styleUrls: ['./confirmar-acao-list.component.scss']
})
export class ConfirmarAcaoListComponent implements OnInit {

  confirmarAcoes : any = [] // Vetor vazio

  displayedColumns : string[] = [ 'cuidador', 'data_hora', 'medicamento', 'horario', 'confirmar_horario', 'confirmar_medicamento', 'editar', 'excluir']

  constructor(
    private confirmarAcaoSrv : ConfirmarAcaoService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.confirmarAcoes = await this.confirmarAcaoSrv.listar()
    console.log(this.confirmarAcoes)
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
        await this.confirmarAcaoSrv.excluir(id)
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
