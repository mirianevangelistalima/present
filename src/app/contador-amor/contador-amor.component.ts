import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { addYears, addMonths, differenceInYears, differenceInMonths, differenceInDays, differenceInHours, addHours } from 'date-fns';


@Component({
  selector: 'app-contador-amor',
  imports: [
    MatDatepickerModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,

  ],
  templateUrl: './contador-amor.component.html',
  styleUrl: './contador-amor.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],

})
export class ContadorAmorComponent implements OnInit {
  readonly date = new FormControl();
  datePipe: DatePipe;

  dialogRef = inject<MatDialogRef<ContadorAmorComponent>>(MatDialogRef<ContadorAmorComponent>,);
  data = inject(MAT_DIALOG_DATA);


  results: string = '';
  meteors: number[] = [];


  constructor() {
    const data = this.data;
    this.date.setValue(data.selectedDate);
    this.datePipe = new DatePipe('pt-BR');
  }


  ngOnInit(): void { }


  fecharComResultado() {

    this._startMeteor();
    if (this.date.value) {
      this.dialogRef.close({
        date: this.date.value,
        resultadoTexto: this.results,
      }); // passa a data selecionada de volta ao pai
    }
  }


  private _startMeteor() {
    const dataSelecionada = this.date.value;
    const hoje = new Date();


    if (!dataSelecionada) {
      this.results = 'Selecione uma data.';
      return;
    }

    // Verifica se a data selecionada é 16/05/2023
    const dataEspecial = new Date(2023, 4, 16); // 4 = Maio porque janeiro é 0
    const mesmaData =
      dataSelecionada.getDate() === dataEspecial.getDate() &&
      dataSelecionada.getMonth() === dataEspecial.getMonth() &&
      dataSelecionada.getFullYear() === dataEspecial.getFullYear();

    const diffMs = hoje.getTime() - new Date(dataSelecionada).getTime();

    const segundosTotal = Math.floor(diffMs / 1000);
    const minutosTotal = Math.floor(segundosTotal / 60);
    const horasTotal = Math.floor(minutosTotal / 60);
    const diasTotal = Math.floor(horasTotal / 24);

    const segundos = segundosTotal % 60;
    const minutos = minutosTotal % 60;
    const horas = horasTotal % 24;

    const anos = differenceInYears(hoje, dataSelecionada);
    const meses = differenceInMonths(hoje, addYears(dataSelecionada, anos));
    const dias = differenceInDays(hoje, addMonths(addYears(dataSelecionada, anos), meses)) % 30;

    const abs = (n: number) => Math.abs(n);

    if (mesmaData) {
      const message = `Olá Reylan, estamos há ${abs(anos)} ${abs(anos) === 1 ? 'ano' : 'anos'}, ${abs(meses)} ${abs(meses) === 1 ? 'mês' : 'meses'}, ${abs(dias)} ${abs(dias) === 1 ? 'dia' : 'dias'}, ${horas}h ${minutos}min ${segundos}s desde o nosso Big Bang, criando constelações de memórias ⭐`;
      this.results = message;
      return;
    }

    this.results = `Estamos juntos há ${abs(anos)} ${abs(anos) === 1 ? 'ano' : 'anos'}, ${abs(meses)} ${abs(meses) === 1 ? 'mês' : 'meses'}, ${abs(dias)} ${abs(dias) === 1 ? 'dia' : 'dias'}, ${horas}h ${minutos}min ${segundos}s... 💖`;
  }

}
