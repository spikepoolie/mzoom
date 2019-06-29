
import { Component, OnInit } from '@angular/core';
import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})

export class MyFilesComponent implements OnInit {

  userid = localStorage.getItem('userid');
  myRecords: any[];
  private urlGetMyFiles = 'mktzoom_get_user_files.php';

  constructor(
    private router: Router,
    private data: DataService,
    private mktZoomService: MktZoomServiceService) { }

  ngOnInit() {
    // if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
    //   this.router.navigateByUrl('/loginregistration');
    // }
     this.getUserFiles(parseInt(this.userid, 0));
    //this.getMyFile(163);
  }

  getUserFiles(userid) {
    const myEntry = '{"userid":' + userid + '}';
    this.mktZoomService.getDocumentsByFlow(myEntry, this.urlGetMyFiles).subscribe(
      response => this.myRecords = response,
      error => console.log('Error: ', error)
    );
  }

  getMyFile(docid) {
    if (docid > 0) {
     // this.data.changeMessage(this.myRecords);
      this.data.changeMessageDocId(docid);
      localStorage.setItem('docid', docid);
      this.router.navigateByUrl('/reviewcontent');
    }
  }
}
