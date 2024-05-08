import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
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
    </div>
  }`,
  styleUrl: './toast.component.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ToastComponent implements OnInit {
  private _toastService = inject(ToastService);
  toast = this._toastService.toast;
  display = this._toastService.display;

  ngOnInit(): void {
    this.automaticClose();
  }

  automaticClose() {
    setTimeout(() => {
      this._toastService.closeToast();
    }, 3000);
  }

}
