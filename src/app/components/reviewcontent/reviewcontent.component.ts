import { ContenthelperComponent } from './../contenthelper/contenthelper.component';
import { DochistoryComponent } from './../dochistory/dochistory.component';
import { any } from 'codelyzer/util/function';
import { Router } from '@angular/router';
import { DataService } from './../../services/data.service';
import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import * as _ from 'lodash';

@Component({
  selector: 'app-reviewcontent',
  templateUrl: './reviewcontent.component.html',
  styleUrls: ['./reviewcontent.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        height: '*',
        width: '100%'
      })),
      state('out', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
        width: '0px'
      })),
      transition('out => in', animate('400ms ease-in-out')),
      transition('in => out', animate('400ms ease-in-out'))
    ])
  ]
})

export class ReviewcontentComponent implements OnInit {
  constructor(
    private data: DataService,
    private mktZoomService: MktZoomServiceService,
    private router: Router
  ) {
    this.mobHeight = ((window.screen.height) / 2);
    this.mobWidth = (window.screen.width / 2);
  }

  openMethod = false;
  mobHeight: number;
  mobWidth: number;
  message: any;
  isModalShown = false;
  isModalShownBottom = false;
  docid: number;
  userid: number;
  docinfo: any;
  campaignList = [];
  assetList = [];
  initiativesList = [];
  myDataDocs: any;
  documentsHistory: any;
  roleList = [];
  company_name: string;
  docintentArray = [];
  campaignIntent = '';
  docContentCodesArray = [];
  docContentCodes = ''
  doc_name: string;
  myCampaign: string;
  myRole: string;
  myRoleId: number;
  myInitiativeId;
  myTypeId;
  hasContent = false;
  myTypes = '';
  myInitiative = '';
  myAsset: string;
  typesList: any[];
  resourcesList: any[];
  myType: string;
  docIdJson = [];
  myIntent: string;
  messagedocid: any;
  contentHelper: string;
  myData: any;
  myDataDoc: any;
  helpMenuOpen: string;
  myCampaignId;
  myAssetId;
  personaIntelligenceList = [];
  resources = [];
  templatetools = [];

  private url = 'https://www.goemobile.com/mzoom/php/json.php';
  private campaignUrl = 'mktzoom_get_campaigns_list.php';
  private assetUrl = 'mktzoom_get_assets_list.php';
  private initiativeUrl = 'mktzoom_get_initiatives_list.php';
  private typesUrl = 'mktzoom_get_types_list.php';
  private documentReviewUrl = 'mktzoom_get_document_reviews_by_docid.php';
  private roleUrl = 'mtkzoom_get_roles_list.php';
  private docUrl = 'mktzoom_get_doc_by_id.php';
  private resourcesUrl = 'mktzoom_get_resourcess.php';

  masterName = 'DOCUMENT INPUTS';
  ngOnInit() {
    console.log('is logged = ' + localStorage.getItem('islogged'));
    if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
      //this.router.navigateByUrl('/loginregistration');
    }
    if (parseInt(localStorage.getItem('docid'), 0) > 0 && localStorage.getItem('docid') !== undefined) {
      this.getJson();
      this.getCampaignsList();
      this.getRolesList();
      this.getAssetsList();
      this.userid = parseInt(localStorage.getItem('userid'), 0);
      this.getDocument(parseInt(localStorage.getItem('docid'), 0));
      this.getInitiativesList();
      this.getTypesList();
      //this.getResoucesList();
      this.getDocumentsReview(parseInt(localStorage.getItem('docid'), 0));
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }

  showContent() {
    this.hasContent = true;
    this.myIntent = `${this.myCampaign}|${this.myAsset}|${this.myRole}|${this.myInitiative}|${this.myTypes}`;
    this.helpMenuOpen = 'in';
    //const myEntry = `'{"campaign":"${this.myCampaign}","asset":"${this.myAsset}","role":"${this.myRole}","initiative":"${this.myInitiative}","type":"${this.myTypes}",}'`;
    const myEntry = '{"campaign":"' + this.myCampaignId + '","asset":"' + this.myAssetId + '", "role":"' + this.myRoleId + '", "initiative":"' + this.myInitiativeId + '", "type":"' + this.myTypeId + '"}';
    this.mktZoomService.getContent(myEntry, this.resourcesUrl).subscribe(response => {
      if (response.length > 0) {
        this.contentHelper = response[0].document_content;
        this.personaIntelligenceList = JSON.parse(response[0].persona_intelligence);
        this.resources = JSON.parse(response[0].resources);
        this.templatetools = JSON.parse(response[0].templates_tools);
        console.log(this.personaIntelligenceList);
        console.log(this.resources);
        console.log(this.templatetools);
      }
    });
  }

  getCampaignsList(): any {
    this.mktZoomService.getCampaignList(this.campaignUrl).subscribe(response => {
      if (response) {
        this.campaignList = response;
      }
    });
  }

  getMyDataDocs() {
    return this.myDataDocs;
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  getResoucesList() {
    this.mktZoomService.getResourcesList(this.resourcesUrl).subscribe(response => {
      if (response) {
        this.resourcesList = response;
      }
    });
  }

  getDocumentsReview(docid: number): void {
    if (docid !== undefined) {
      const myEntry = '{"userid":"' + this.userid + '", "docid":"' + docid + '"}';
      this.mktZoomService.getDocReview(myEntry, this.documentReviewUrl).subscribe(response => {
        if (response) {
          this.documentsHistory = response;
        } else {
          this.documentsHistory = [];
        }
      });
    } else {
      this.documentsHistory = [];
    }
  }

  getInitiativesList(): any {
    this.mktZoomService.getInitiativesList(this.initiativeUrl).subscribe(response => {
      if (response) {
        this.initiativesList = response;
      }
    });
  }

  getTypesList(): any {
    this.mktZoomService.getTypesList(this.typesUrl).subscribe(response => {
      if (response) {
        this.typesList = response;
      }
    });
  }

  getDocument(docid: number): void {
    if (docid !== undefined) {
      const myEntry = '{"userid":"' + this.userid + '", "docid":"' + docid + '"}';
      this.mktZoomService.getDocReview(myEntry, this.docUrl).subscribe(response => {
        if (response) {
          this.myDataDoc = response;
          for (const elements of this.myDataDoc) {
            this.contentHelper = elements.doc_content;
            this.campaignIntent = elements.doc_intent;
            this.docContentCodes = elements.doc_intent_code;
            this.doc_name = elements.doc_name;
            this.docid = elements.id;
          }

          // this.documentsHistory = response;
          this.docintentArray = this.campaignIntent.split('|');
          this.docContentCodesArray = this.docContentCodes.split('|');
          this.myCampaign = this.docintentArray[0];
          this.myCampaignId = this.docContentCodesArray[0];
          this.myAsset = this.docintentArray[1];
          this.myAssetId = this.docContentCodesArray[1];
          this.myRole = this.docintentArray[2];
          this.myRoleId = this.docContentCodesArray[2];
          this.myInitiative = this.docintentArray[3];
          this.myInitiativeId = this.docContentCodesArray[3];
          this.myTypes = this.docintentArray[4];
          this.myTypeId = this.docContentCodesArray[4];
        }
      });
    } else {
      this.documentsHistory = [];
    }
  }

  getJson(): void {
    const myEntry = '{"username":' + localStorage.getItem('user') + '}';
    this.mktZoomService.getLoginInfo(myEntry, 'json.php').subscribe(response => {
      if (response) {
        this.myDataDocs = response.resources;
      }
    });
  }

  getRolesList(): void {
    this.mktZoomService.getRolesList(this.roleUrl).subscribe(response => {
      if (response) {
        this.roleList = response;
      }
    });
  }

  getAssetsList(): void {
    this.mktZoomService.getAssetsList(this.assetUrl).subscribe(response => {
      if (response) {
        this.assetList = response;
      }
    });
  }
}
