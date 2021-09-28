import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/modules/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private loginSvc: LoginService) { }
  email: String;
  getEmail()
  {
    this.email = this.loginSvc.getEmail();
  }
  ngOnInit() {
    this.getEmail();
  }
}
