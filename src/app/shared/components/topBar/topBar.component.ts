import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <header class="top-bar">
    <h3 class="title">Banco</h3>
  </header>
  `,
  styleUrl: './topBar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent { }
