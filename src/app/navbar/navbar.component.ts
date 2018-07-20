
import { DataService } from '../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, Data } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  todayDate = new Date();
  isVisible: boolean;
  currentyear: number = this.todayDate.getFullYear();
  userlogged: boolean;
  url = '';
  constructor(private router: Router, private data: DataService) { }

  ngOnInit() {
    this.data.currentisloggedin.subscribe(userlogged => this.userlogged = userlogged);
  }

  setLogoutInVisible(): void {
    this.isVisible = false;
    this.router.navigateByUrl('/login');
  }

  checkIfUserIsLoggedIn() {
    this.data.currentisloggedin.subscribe(userlogged => this.userlogged = userlogged);
  }

  isLoginRoute() {
    let shouldUseHeader = false;
    if (this.url.indexOf('contenthelper') > 0 ||
      this.url.indexOf('createcontent') > 0 ||
      this.url.indexOf('approvecontent') > 0 ||
      this.url.indexOf('reviewcontent') > 0 ||
      this.url.indexOf('publishcontent') > 0 ||
      this.url.indexOf('dashboard') > 0 ||
      this.url.indexOf('doccompare') > 0) {
      shouldUseHeader = false;
    } else {
      shouldUseHeader = true;
    }
    return shouldUseHeader;
  }
}
