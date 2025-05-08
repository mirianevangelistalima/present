import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { addYears, addMonths, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';


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
  ],
})
export class ContadorAmorComponent implements OnInit {
  readonly date = new FormControl();

  dialogRef = inject<MatDialogRef<ContadorAmorComponent>>(MatDialogRef<ContadorAmorComponent>,);
  data = inject(MAT_DIALOG_DATA);


  results: string = '';
  meteors: number[] = [];




  constructor() {
    const data = this.data;
    this.date.setValue(data.selectedDate);
  }


  ngOnInit(): void {
  }

  startMeteor() {
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

    // Faz o cálculo da diferença de forma precisa
    const anos = differenceInYears(hoje, dataSelecionada);
    const meses = differenceInMonths(hoje, addYears(dataSelecionada, anos));
    const dias = differenceInDays(hoje, addMonths(addYears(dataSelecionada, anos), meses));

    const abs = (n: number) => Math.abs(n);

    if (mesmaData) {
      this.results = `Olá Reylan, estamos há ${abs(anos)} ${abs(anos) === 1 ? 'ano' : 'anos'}, ${abs(meses)} ${abs(meses) === 1 ? 'mês' : 'meses'} e ${abs(dias)} ${abs(dias) === 1 ? 'dia' : 'dias'} desde o nosso Big Bang, criando constelações de memórias ⭐`;
      return;
    }
    this.results = `Estamos juntos há ${abs(anos)} ${abs(anos) === 1 ? 'ano' : 'anos'}, ${abs(meses)} ${abs(meses) === 1 ? 'mês' : 'meses'} e ${abs(dias)} ${abs(dias) === 1 ? 'dia' : 'dias'}...`;

  }

  fecharComResultado() {
    this.startMeteor(); // calcula antes, se quiser
    if (this.date.value) {
      this.dialogRef.close({
        date: this.date.value,
        resultadoTexto: this.results,
      }); // passa a data selecionada de volta ao pai
    }
  }



}
