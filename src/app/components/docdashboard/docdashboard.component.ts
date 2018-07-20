import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { ContenttemplateComponent } from '../contenttemplate/contenttemplate.component';

@Component({
  selector: 'app-docdashboard',
  templateUrl: './docdashboard.component.html',
  styleUrls: ['./docdashboard.component.scss']
})

export class DocdashboardComponent implements OnInit {


  public isModalShown = false;
  userid = localStorage.getItem('userid');
  user = localStorage.getItem('user');
  myid;
  myData: any[];
  myRecords: any[];
  myTotal = 0;
  docFlowDescription = '';
  private urlGetDocsByUser = 'mktzoom_get_user_documents.php';
  private urlGetDocByFlow = 'mktzoom_get_user_documents_by_flow.php';
  @ViewChild('basicModal') public basicModal: ModalDirective;

  constructor(
    private router: Router,
    private data: DataService,
    private mktZoomService: MktZoomServiceService) { }

  ngOnInit() {
    if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
      this.router.navigateByUrl('/loginregistration');
    }
    this.getMyDocuments(parseInt(this.userid, 0));
  }

  getDocsByFlow(flowid: number, flowname: string) {
    this.docFlowDescription = flowname;
    const myEntry = '{"userid":' + localStorage.getItem('userid') + ', "flowid":' + flowid + '}';
    this.mktZoomService.getDocumentsByFlow(myEntry, this.urlGetDocByFlow).subscribe(
      response => this.myRecords = response,
      error => console.log('Error: ', error),
      () => {
        this.isModalShown = true;
      }
    );
  }

  getMyDocuments(userid: number): any {
    const myEntry = '{"userid":"' + userid + '"}';
    this.mktZoomService.getAllMyDocuments(myEntry, this.urlGetDocsByUser).subscribe(response => {
      this.myData = response;
      this.myData.forEach((element) => {
        this.myTotal += parseInt(element.total, 0);
      });
    });
  }

  public showModal(): void {
    this.myid = 0;
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.basicModal.hide();
  }

  public onHidden(): void {
    this.isModalShown = false;
    if (this.myid > 0) {
      this.data.changeMessage(this.myRecords);
      this.data.changeMessageDocId(this.myid);
      localStorage.setItem('docid', this.myid);
      this.router.navigateByUrl('/reviewcontent');
    }
  }
}
