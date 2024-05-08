import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  isLoading = signal<Boolean>(false);

  hide() {
    this.isLoading.set(false);
  }

  show() {
    this.isLoading.set(true);
  }

}
