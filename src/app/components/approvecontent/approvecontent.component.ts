import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approvecontent',
  templateUrl: './approvecontent.component.html',
  styleUrls: ['./approvecontent.component.scss']
})
export class ApprovecontentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log("here I a ");
    if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
      this.router.navigateByUrl('/loginregistration');
    }
  }

}
