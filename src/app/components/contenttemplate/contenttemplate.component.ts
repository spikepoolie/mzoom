import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { ModalDirective } from 'angular-bootstrap-md';
import { Http } from '@angular/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';



@Component({
  selector: 'app-contenttemplate',
  templateUrl: './contenttemplate.component.html',
  styleUrls: ['./contenttemplate.component.scss'],
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

export class ContenttemplateComponent implements OnInit {
  @Input() masterName: string;
  campaignList = [];
  initiativesList = [];
  typesList = [];
  isModalEmailShown = false;
  company_name: string;
  assetList = [];
  myEntry = '';
  usersSelected = [];
  roleIntelligenceList = [];
  competitiveIntelligence = [];
  bestTemplates = [];
  userslist = [];
  roleList = [];
  cioResearch = [{ 'name': 'CIO priorities 2018', 'link': 'https://www.riministreet.com/Documents/Collateral/Rimini-Street-Success-Story-RSA-Insurance.pdf' }];
  myCampaign = '';
  myCampaignId;
  myFlowId = 4;
  reviewers: any;
  myRole = '';
  doc_name: string;
  myRoleId;
  myDocName = 'Test Doc';
  myAsset = '';
  myInitiativeId;
  myTypeId;
  myTypes = '';
  myInitiative = '';
  myAssetId;
  myIntent: string;
  myData: any[];
  hasContent = false;
  roleIntelligence: any[];
  bestsampletemplate: any[];
  resourcesintelligence: any[];
  resourcesList: any[];
  helpfulResourcesList: any[];
  helpMenuOpen: string;
  contentHelper: string;
  mobHeight;
  mobWidth;
  sendEmail = false;
  userid = localStorage.getItem('userid');
  iscreating = true;
  buttonCreateBackText = 'Continue';
  showContentInfo = false;
  private url = 'json.php';
  private createContentUrl = 'mktzoom_create_document.php';
  private campaignUrl = 'mktzoom_get_campaigns_list.php';
  private initiativeUrl = 'mktzoom_get_initiatives_list.php';
  private typesUrl = 'mktzoom_get_types_list.php';
  private roleUrl = 'mtkzoom_get_roles_list.php';
  private assetUrl = 'mktzoom_get_assets_list.php';
  private uersUrl = 'mktzoom_get_users_emails.php';
  private createDocumentUrl = 'mktzoom_create_document.php';
  private resourcesUrl = 'mktzoom_get_resourcess.php';
  private helpfulResourcesSamplesTemplatesUrl = 'mktzoom_get_helpful_resourcess_best_samples_templates_by_id.php';
  private helpfulResourcesCompetitiveIntelligenceUrl = 'mktzoom_get_helpful_resourcess_competitive_intelligence_by_id.php';
  private helpfulResourcesRoleIntelligenceUrl = 'mktzoom_get_helpful_resourcess_role_intelligence_by_id.php';
  public isModalShown = false;
  public isModalEmailsShown = false;

  constructor(
    private http: Http,
    private router: Router,
    private mktZoomService: MktZoomServiceService
  ) {
    this.mobHeight = ((window.screen.height) / 2);
    this.mobWidth = (window.screen.width / 2);
  }

  @ViewChild('basicModal') public basicModal: ModalDirective;
  @ViewChild('basicModal1') public basicModal1: ModalDirective;

  ngOnInit() {
    this.helpMenuOpen = 'out';
    this.getCampaignsList();
    this.getRolesList();
    this.getAssetsList();
    this.getUsers();
    this.getInitiativesList();
    this.getTypesList();
    this.getResoucesList();
    if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
      this.router.navigateByUrl('/loginregistration');
    }
  }

  isChecked(idx: number) {
    if (this.usersSelected.indexOf(idx) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  getResoucesList() {
    this.mktZoomService.getResourcesList(this.resourcesUrl).subscribe(response => {
      if (response) {
        this.resourcesList = response;
      }
    });
  }

  getUsers() {
    this.mktZoomService.getResourcesList(this.uersUrl).subscribe(response => {
      if (response) {
        this.userslist = response;
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

  updateUserSelection(id: number, evt) {
    let myIndex;
    if (evt.target.checked) {
      this.usersSelected.push(id);
    } else {
      myIndex = this.usersSelected.findIndex(k => k === id);
      if (myIndex !== -1) {
        this.usersSelected.splice(myIndex, 1);
      }
    }
    //this.reviewers = JSON.stringify(this.usersSelected);
    this.reviewers = this.usersSelected.toString();
  }

  getRolesList(): any {
    this.mktZoomService.getRolesList(this.roleUrl).subscribe(response => {
      if (response) {
        this.roleList = response;
      } else {}
    });
  }

  getAssetsList(): any {
    this.mktZoomService.getAssetsList(this.assetUrl).subscribe(response => {
      if (response) {
        this.assetList = response;
      } else {}
    });
  }

  resetMyForm() {
    this.myRole = '';
    this.myRoleId = '';
    this.myCampaign = '';
    this.myCampaignId = '';
    this.myAsset = '';
    this.myAssetId = '';
    this.doc_name = '';
    this.myInitiative = '';
    this.myInitiativeId = '';
    this.myTypeId = '';
    this.myTypes = '';
    this.helpMenuOpen = 'out';
  }

  getJson(): any {
    const myEntry = '{"username":"rodrigo"}';
    this.mktZoomService.getLoginInfo(myEntry, 'json.php').subscribe(response => {
      if (response) {
        this.myData = response.resources.documents;
      } else {

      }
    });
  }

  ClearOptions() {
    this.myCampaign = '';
    this.myRole = '';
    this.myAsset = '';
    this.myDocName = '';
    this.myInitiative = '';
    this.myTypes = '';
    this.showContentInfo = false;
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
       this.roleIntelligenceList = JSON.parse(response[0].role_intelligence);
       this.competitiveIntelligence = JSON.parse(response[0].competitive_intelligence);
       this.bestsampletemplate = JSON.parse(response[0].best_templates);
      }
    });
  }

  createDocument(frm: NgForm) {
    //this.isModalEmailShown = true;
    // const myIntent = `this.mycampaign|this.myAsset|this.myRole`;
    // const myEntry = '{"docintent":"' + myIntent + '", "doc_name":" ' + this.myDocName + '", "userid":"' + localStorage.getItem('userid') + '", "myCampaignid":"' + this.myCampaignId + '","myRoleId":"' + this.myRoleId + '","myAssetId":"' + this.myAssetId + '","myFlowId":"4","contentHelper":"' + this.contentHelper + '"}';
    this.mktZoomService.createDocument(JSON.stringify(frm.value), this.createDocumentUrl).subscribe(response => {
      if (response) {
        this.myData = response;
      }
    });
  }

  public showModalEmail(): void {
    //this.myid = 0;
    this.isModalEmailShown = true;
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  public onHiddenEmails() {
    this.isModalEmailShown = false;
  }

  jsonEscape(str) {
    return str.replace(/\n/g, '\\\\n').replace(/\r/g, '\\\\r').replace(/\t/g, '\\\\t');
  }

  sendForm() {
    const myEntry = '{"myRoleId":"' + this.myRoleId + '", "myCampaignId":"' + this.myCampaignId + '", "myAssetId":"' + this.myAssetId + '", "userid":"' + this.userid + '", "myFlowId":"' + this.myFlowId + '", "contentHelper":"' + this.jsonEscape(this.contentHelper) + '", "doc_name":"' + this.doc_name + '", "docintent":"' + this.myIntent + '", "myinitiativeid":"' + this.myInitiativeId + '", "mytypeid":"' + this.myTypeId + '", "reviewers":"' + this.reviewers + '"}';
    this.mktZoomService.createDocument(myEntry, this.createContentUrl).subscribe(response => {
      // if (response && Array.isArray(response)) {
      //   localStorage.setItem('userid', response[0].id);
      //   localStorage.setItem('user', response[0].first_name);
      //   this.hasCorrectLogin = true;
      //   this.data.changeMessageIsLoggedIn(true);
      //   this.router.navigateByUrl('/contenthelper');
      // } else {
      //   localStorage.setItem('userid', '');
      //   localStorage.setItem('user', '');
      //   this.data.changeMessageIsLoggedIn(true);
      //   this.hasCorrectLogin = false;
      //   this.isSubmitting = false;
      // }
    });
  }

}

