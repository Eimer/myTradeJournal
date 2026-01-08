import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [MatInputModule,
    MatButtonModule,
    MatIconModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  constructor(private _location: Location) { }

  goBack(): void {
    this._location.back();
  }
}
