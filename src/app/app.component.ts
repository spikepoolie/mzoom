import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginregistrationComponent } from './components/loginregistration/loginregistration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  todayDate = new Date();
  currentyear: number = this.todayDate.getFullYear();
  title = 'MarketZoom';
  url = '';
  isModalShown = false;
  types = ["PDF","Web Page", "Blog", "Social Media"];
  dontdisplay = true;
  constructor(
    private http: Http,
    private router: Router) {
    this.router.events.subscribe(
      (res) => {
        this.url = this.router.url;
      }
    );
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  showPublishOptions() {
    this.dontdisplay = false;
  }

  isLoginRoute() {
    let shouldUseHeader = false;
    if (this.url.indexOf('createcontent') > 0 ||
      this.url.indexOf('contenthelper') > 0 ||
      this.url.indexOf('contenttemplate') > 0 ||
      this.url.indexOf('approvecontent') > 0 ||
      this.url.indexOf('reviewcontent') > 0 ||
      this.url.indexOf('publishcontent') > 0 ||
      this.url.indexOf('dashboard') > 0 ||
      this.url.indexOf('doccompare') > 0) {
      shouldUseHeader = true;
    } else {
      shouldUseHeader = false;
    }
    return shouldUseHeader;
  }

  logout() {
    localStorage.setItem('islogged', '0');
  }
}
