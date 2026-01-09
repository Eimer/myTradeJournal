import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { LoaderService } from '../core/services/loader.service';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { UserService } from '../core/services/user.service';
import { UserAuthStatus } from '../core/models/user.model';
import { HeaderComponent } from './header/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout.component',
  imports: [RouterOutlet, CommonModule, LoaderComponent, SidenavComponent, HeaderComponent, MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  public loaderService = inject(LoaderService);
  public userService = inject(UserService);
  public readonly userAuthStatus = UserAuthStatus

  constructor() {
    this.userService.user$.subscribe( (data) => {
      console.log(data?.status === this.userAuthStatus.loggedIn);
      
    } )
  }
}
