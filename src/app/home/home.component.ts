import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContadorAmorComponent } from '../contador-amor/contador-amor.component';

@Component({
  selector: 'app-home',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  dialog = inject(MatDialog);

  selectedDate = model<Date | null>(null);
  textoResult = model<string>('');
  opencounter() {
    const dialogRef = this.dialog.open(ContadorAmorComponent, {
      minWidth: '500px',
      data: { selectedDate: this.selectedDate() },
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.selectedDate.set(result);
      // console.log('Data recebida do diálogo:', result);
      if (result?.date) {
        this.selectedDate.set(result.date);
        this.textoResult.set(result.resultadoTexto);
        console.log('Texto do cálculo:', result.resultadoTexto);
      }
    });
  }
}
