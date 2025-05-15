import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ContadorAmorComponent } from '../contador-amor/contador-amor.component';
import { FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,


],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  readonly date = new FormControl();
  dialog = inject(MatDialog);

  selectedDate = model<Date | null>(null);
  textoResult = model<string>('');
  dateEspecial = new Date(2023, 4, 16);
  private readonly _router = inject(Router);


  opencounter() {
    const dialogRef = this.dialog.open(ContadorAmorComponent, {
      minWidth: '500px',
      data: { selectedDate: this.selectedDate() },
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result?.date) {

        this.selectedDate.set(result.date);
        this.textoResult.set(result.resultadoTexto);
      }
    });
  }

  isDataEspecial(): boolean {
    const dataEspecial = new Date(2023, 4, 16);
    const selected = this.date.value;

    if (!selected) return false;

    return (
      selected.getDate() === dataEspecial.getDate() &&
      selected.getMonth() === dataEspecial.getMonth() &&
      selected.getFullYear() === dataEspecial.getFullYear()
    );
  }

  startTravelTime() {
    this._router.navigate(['/viagemTempo']);
  }

}
