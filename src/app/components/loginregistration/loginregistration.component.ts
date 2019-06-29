import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';


@Component({
  selector: 'app-login-registration',
  templateUrl: './loginregistration.component.html',
  styleUrls: ['./loginregistration.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1500)
      ]),
      transition('* => void', [
        animate(0, style({ opacity: 1 }))
      ])
    ]),
    trigger('fadeInAnimation1', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1500)
      ]),
      transition(':leave', [
        animate(0, style({ opacity: 0 }))
      ]),
    ]),
    trigger('fadeInAnimation2', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1500)
      ]),
      transition(':leave', [
        animate(0, style({ opacity: 0 }))
      ]),
    ]),
    trigger('fadeInSpinner', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(800)
      ]),
      transition(':leave', [
        animate(800, style({ opacity: 0 }))
      ]),
    ]),
    trigger('scaleForm', [
      transition(':enter', [
        style({ transform: 'scale(1.1)' }),
        animate(1000)
      ]),
      transition(':leave', [
        animate(0, style({ transform: 'scale(1.0)' }))
      ])
    ]),
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateX(-90%)' }),
        animate(300)
      ]),
      transition(':leave', [
        group([
          animate(700, style({
            transform: 'translate(180%)'
          })),
          animate(300, style({
            opacity: 0
          }))
        ])
      ])
    ]),
    trigger('recoveraccount', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', 'opacity': 0 }),
        animate('500ms', style({ transform: 'translateY(0)', 'opacity': 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', 'opacity': 1 }),
        animate('500ms', style({ transform: 'translateY(100%)', 'opacity': 0 }))
      ])
    ])
  ]
})



export class LoginregistrationComponent implements OnInit {
  isloggedin: boolean;
  isSubmitting = false;
  showSpinner = false;
  showSpinnerPassword = false;
  hasCorrectLogin = true;
  isRecoverAccount = false;
  hasCorrectEmail = true;
  hasUserName = true;
  hasPassWord = true;
  hasEmail = true;
  hasRegistrationEmail = true;
  hasRegistrationPassword = true;
  hasPasswordMatch = true;
  hasConfirmPassword = true;
  hasEmailEntered = false;
  hasEnteredConfirmPassword = false;
  myPassword = ' ';
  hasAccount = false;
  hasCorrectEmailMessage = false;
  emailRecover;
  loginData = [];
  daycareinfo = [];

  private urlCheckLogin = 'mktzoom_check_login.php';

  constructor(
    private http: HttpClientModule,
    private router: Router,
    private data: DataService,
    private route: ActivatedRoute,
    private mktZoomService: MktZoomServiceService) { }

  getOpacity() {
    if (this.isRecoverAccount) {
      return 0.3;
    } else {
      return 1;
    }
  }

  checkLogin(frm) {
    if (frm.username === '') {
      this.hasUserName = false;
    } else {
      this.hasUserName = true;
    }
    if (frm.password === '') {
      this.hasPassWord = false;
    } else {
      this.hasPassWord = true;
    }

    this.isSubmitting = true;
    this.showSpinner = true;
    this.GetLogin(frm, this.urlCheckLogin);
  }

  GetLogin(frm: NgForm, url: string): any {
    this.mktZoomService.getLoginInfo(JSON.stringify(frm.value), url).subscribe(response => {
      if (response && Array.isArray(response)) {
        localStorage.setItem('userid', response[0].id);
        localStorage.setItem('user', response[0].first_name);
        localStorage.setItem('islogged','1');
        this.hasCorrectLogin = true;
        this.data.changeMessageIsLoggedIn(true);
        this.router.navigateByUrl('/contenthelper');
      } else {
        localStorage.setItem('islogged', '0');
        localStorage.setItem('userid', '');
        localStorage.setItem('user', '');
        this.data.changeMessageIsLoggedIn(true);
        this.hasCorrectLogin = false;
        this.isSubmitting = false;
      }
    });
  }



  GetLogo() {
    return 'assets/images/mktzoomlogonew.png';
  }

  clearSentRecoverPasswordMessage() {
    this.hasCorrectEmailMessage = false;
  }

  RemoveRequiredEmail() {
    this.hasEmail = true;
  }

  ngOnInit() {
    const hasLogin = localStorage.getItem('islogged');
    let pageToGo = localStorage.getItem('mylastpage');
    if (hasLogin === '0' || hasLogin === undefined || hasLogin === null) {
      localStorage.setItem('islogged', '0');
      localStorage.setItem('mylastpage', 'loginregistration');
      pageToGo = 'loginregistration';
    } else {
      if (pageToGo === undefined) {
        pageToGo = 'loginregistration';
      }
    }
    this.router.navigateByUrl('/' + pageToGo);
  }

  SetPageToGo(page) {
    localStorage.setItem('mylastpage', page);
  }
}
