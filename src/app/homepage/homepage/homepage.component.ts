import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/interfaces';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public user!: User | null;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.user = this._authService.getUserInfo();
  }

  public logout() {
    this._authService.logout();
  }
}
