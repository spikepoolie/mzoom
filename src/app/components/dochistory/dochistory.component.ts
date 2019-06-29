import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dochistory',
  templateUrl: './dochistory.component.html',
  styleUrls: ['./dochistory.component.scss']
})

export class DochistoryComponent implements OnInit {
  @Input('openMethod') openMethod: boolean;
  @Input('myDataDocs') myDataDocs: any;
  @Input('documentname') documentname: string;
  @Input('documentsHistory') documentsHistory: any;
  private compareUrl = 'mktzoom_compare_doc_reviews.php';

  @ViewChild('basicModal', { static: true }) public basicModal: ModalDirective;
  isModalShownBottom = true;
  isModalHistoryShown = false;
  mobHeight: number;
  mobWidth: number;
  shouldGoToCompareScreen = false;
  isComparable = false;
  userid: number;
  docsToCompare = [];
  comparedDocs: any;
  doccomparado: any;
  constructor(
    private mktZoomService: MktZoomServiceService,
    public router: Router,
    private data: DataService,
    private route: ActivatedRoute) {
    this.mobHeight = ((window.screen.height) / 2);
    this.mobWidth = ((window.screen.width) / 2);
  }

  openModal(): void {
    this.isModalShownBottom = true;
  }

  public onHidden(): void {
    this.isModalShownBottom = false;
    if (this.shouldGoToCompareScreen) {
      this.router.navigateByUrl('/doccompare');
    }
  }

  closeMyModal(id) {
    if (id === 0) {
      this.shouldGoToCompareScreen = true;
    } else {
      this.shouldGoToCompareScreen = false;
    }
    this.basicModal.hide();
  }

  ngOnInit(): void {
    if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
      this.router.navigateByUrl('/loginregistration');
    }
    this.isModalHistoryShown = true;
    this.isModalShownBottom = this.openMethod;
    this.userid = parseInt(localStorage.getItem('userid'), 0);
  }


  updateSelection(id: number, evt): void {
    let myIndex;
    if (evt.target.checked && this.docsToCompare.length < 2) {
      this.docsToCompare.push(id);
    } else {
      myIndex = this.docsToCompare.findIndex(k => k === id);
      if (myIndex !== -1) {
        this.docsToCompare.splice(myIndex, 1);
      } else {
        this.isComparable = false;
        evt.target.checked = false;
      }
    }
    if (this.docsToCompare.length === 2) {
      this.isComparable = true;
    } else {
      this.isComparable = false;
    }
  }

  compareReviews(): any {
    const myJsonString = JSON.stringify(this.docsToCompare);
    const myEntry = '{"userid":' + this.userid + ', "doclistid":"' + this.docsToCompare + '"}';
    this.mktZoomService.getDocsToBeCompared(myEntry, this.compareUrl).subscribe(response => {
      this.comparedDocs = response;
      this.data.changeDocCompare(response);
    });
  }
}
