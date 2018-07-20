import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contenthelper',
  templateUrl: './contenthelper.component.html',
  styleUrls: ['./contenthelper.component.scss']
})
export class ContenthelperComponent implements OnInit {

  username = localStorage.getItem('user');

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
      this.router.navigateByUrl('/loginregistration');
    }
  }

  GotoContent(type: String) {
    if (type === 'create') {
      this.router.navigateByUrl('/createcontent');
    } else if (type === 'review') {
      this.router.navigateByUrl('/reviewcontent');
    } else if (type === 'approve') {
      this.router.navigateByUrl('/approvecontent');
    } else if (type === 'publish') {
      this.router.navigateByUrl('/publishcontent');
    }
  }
}
