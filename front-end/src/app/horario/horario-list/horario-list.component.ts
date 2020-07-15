import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDlgComponent } from 'src/app/ui/confirm-dlg/confirm-dlg.component';

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrls: ['./horario-list.component.scss']
})
export class HorarioListComponent implements OnInit {

  horario : any = [] // Vetor vazio

  displayedColumns : string[] = ['idoso', 'tipo', 'quantidade', 'horario','editar', 'excluir']

  constructor(
    private horarioSrv : HorarioService,
    private snackBar : MatSnackBar,
    private dialog : MatDialog
  ) { }

  async ngOnInit() {
    this.horario = await this.horarioSrv.listar()
    console.log(this.horario)
  }

  async excluirItem(id: string) {
    const dialogRef = this.dialog.open(ConfirmDlgComponent, {
      width: '50%',
      data: {question: 'Deseja realmente excluir este horário?'}
    });

    let result = await dialogRef.afterClosed().toPromise();
    
    //if(confirm('Deseja realmente excluir este horário?')) {
    if(result) {
        
      try {
        await this.horarioSrv.excluir(id)
        this.ngOnInit() // Atualizar os dados da tabela
        //alert('Exclusão efetuada com sucesso.')
        this.snackBar.open('Exclusão efetuada com sucesso.', 'Entendi', 
          { duration: 5000 });
      }
      catch(erro) {
        //alert('ERRO: não foi possível excluir este horario.')
        this.snackBar.open('ERRO: não foi possível excluir este horário.', 
          'Que pena!', { duration: 5000 });
      }
    }
  }

}
