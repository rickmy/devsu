import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  @if(isLoading()){
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  }`,
  styleUrl: './spinner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  private spinnerService = inject(SpinnerService)
  isLoading = this.spinnerService.isLoading;

}
