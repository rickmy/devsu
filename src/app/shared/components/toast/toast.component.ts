import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { Toast } from '@core/models/toast/toast';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  @if(display()) {
    <div class="toaster">
      <div class="toast {{toast().severity}}">{{ toast().detail }}</div>
      <button class="close-btn" (click)="close()">&times;</button>
    </div>
  }`,
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent implements AfterViewInit {
  private _toastService = inject(ToastService);
  toast = this._toastService.toast;
  display = this._toastService.display;

  ngAfterViewInit(): void {
    this.automaticClose();
  }

  automaticClose() {
    setTimeout(() => {
      this.close();
    }, 3000);
  }

  close() {
    this._toastService.closeToast();
  }

}
