import { Component, OnInit } from '@angular/core';
import { MedicamentoService } from '../medicamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-medicamento-list',
  templateUrl: './medicamento-list.component.html',
  styleUrls: ['./medicamento-list.component.scss']
})
export class MedicamentoListComponent implements OnInit {

  medicamento : any = [] // Vetor vazio

  displayedColumns : string[] = ['nome', 'dosagem', 'horario','editar', 'excluir']

  constructor(
    private medicamentoSrv : MedicamentoService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.medicamento = await this.medicamentoSrv.listar()
    console.log(this.medicamento)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este medicamento?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este medicamento?')) {
    if(result) {
        
      try {
        await this.medicamentoSrv.excluir(id)
        this.ngOnInit() // Atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso.')
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
          { duration: 5000 });
      }
      catch(erro) {
        //alert('ERRO: não foi possível excluir este medicamento.')
        this.snackBar.open('ERRO: não foi possível excluir este medicamento.', 
          'Que pena!', { duration: 5000 });
      }
    }
  }

}

