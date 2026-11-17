import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App {
  listaWarsztatow = ['Robotyka', 'Fotografia', 'Programowanie', 'Grafika'];
  dni = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
  godziny = ['09:00', '10:00', '11:00', '12:00', '13:00'];
 
  zapisy = [
    { id: 1, uczen: 'Anna Kowalska', warsztaty: 'Robotyka', dzien: 'Poniedziałek', godzina: '09:00' },
    { id: 2, uczen: 'Jan Nowak', warsztaty: 'Robotyka', dzien: 'Poniedziałek', godzina: '09:00' },
    { id: 3, uczen: 'Maria Lis', warsztaty: 'Fotografia', dzien: 'Wtorek', godzina: '10:00' },
    { id: 4, uczen: 'Piotr Mazur', warsztaty: 'Programowanie', dzien: 'Środa', godzina: '11:00' }
  ];
 
  uczen = '';
  warsztaty = '';
  dzien = '';
  godzina = '';
  filtr = 'Wszystkie warsztaty';
  komunikat = '';
 
  get widoczne() {
    return this.filtr === 'Wszystkie warsztaty'
      ? this.zapisy
      : this.zapisy.filter(z => z.warsztaty === this.filtr);
  }
 
  get iloscRobotyka() {
    return this.zapisy.filter(z => z.warsztaty === 'Robotyka').length;
  }
 
  dodaj() {
    if (!this.uczen.trim() || !this.warsztaty || !this.dzien || !this.godzina) {
      this.komunikat = 'Uzupełnij wszystkie pola';
      return;
    }
 
    const zajete = this.zapisy.filter(
      z => z.warsztaty === this.warsztaty && z.dzien === this.dzien && z.godzina === this.godzina
    ).length;
 
    if (zajete >= 2) {
      this.komunikat = 'Brak wolnych miejsc na wybrane warsztaty';
      return;
    }
 
    const id = this.zapisy.length ? Math.max(...this.zapisy.map(z => z.id)) + 1 : 1;
    this.zapisy.push({
      id,
      uczen: this.uczen.trim(),
      warsztaty: this.warsztaty,
      dzien: this.dzien,
      godzina: this.godzina
    });
    this.uczen = '';
    this.komunikat = 'Uczeń został zapisany';
  }
 
  wypisz(id: number) {
    this.zapisy = this.zapisy.filter(z => z.id !== id);
  }
}