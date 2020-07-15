import { Component, OnInit } from '@angular/core';
import { IdosoService, Idoso} from '../idoso.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-idoso-list',
  templateUrl: './idoso-list.component.html',
  styleUrls: ['./idoso-list.component.scss']
})
export class IdosoListComponent implements OnInit {

  idosos : Idoso[] = [] as Idoso[] // Vetor vazio

  displayedColumns : string[] = ['nome', 'data_nascimento', 'cpf', 'rg', 'endereco', 'estado_civil', 'peso', 'altura', 'telefone_emergencia', 'enfermidades', 'alergia_medicamento', 'cuidador', 'responsavel', 'editar', 'excluir']

  constructor(
    private idosoSrv : IdosoService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.idosos = await this.idosoSrv.listar()
    console.log(this.idosos)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este idoso?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este idoso?')) {
    if(result) {
        
      try {
        await this.idosoSrv.excluir(id)
        this.ngOnInit() // Atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso.')
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
          { duration: 5000 });
      }
      catch(erro) {
        //alert('ERRO: não foi possível excluir este idoso.')
        this.snackBar.open('ERRO: não foi possível excluir este idoso.', 
          'Que pena!', { duration: 5000 });
      }
    }
  }

}
