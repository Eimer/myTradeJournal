import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { LoaderService } from '../core/services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout.component',
  imports: [RouterOutlet, CommonModule, LoaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public loaderService = inject(LoaderService);
}
