// import { Component, OnInit } from '@angular/core';
// import { trigger, state, transition, style, animate, group } from '@angular/animations';
// import { Router } from '@angular/router';
// import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';
// import { DataService } from './../../services/data.service';

// @Component({
//   selector: 'app-doccompare',
//   templateUrl: './doccompare.component.html',
//   styleUrls: ['./doccompare.component.scss'],
//   animations: [
//     trigger('fadeInAnimation', [
//       transition(':enter', [
//         style({ opacity: 0 }),
//         animate(1500)
//       ]),
//       transition('* => void', [
//         animate(0, style({ opacity: 1 }))
//       ])
//     ]),
//     trigger('scaleForm', [
//       transition(':enter', [
//         style({ transform: 'scale(1.1)' }),
//         animate(1000)
//       ]),
//       transition(':leave', [
//         animate(0, style({ transform: 'scale(1.0)' }))
//       ])
//     ])
//   ]
// })

// export class DoccompareComponent implements OnInit {
//   doccomparado = [];
//   counter = 0;
//   doc_reviewed_date_1;
//   doc_reviewed_date_2;
//   doc_reviewer_1: string;
//   doc_reviewer_2: string;
//   documents = [];
//   docname: string;
//   doc_content_1: string;
//   doc_content_2: string;

//   constructor(
//     private mktZoomService: MktZoomServiceService,
//     public router: Router,
//     private data: DataService) { }

//   ngOnInit() {
//     this.data.currentreview.subscribe(doccomparado => this.doccomparado = doccomparado);
//     if (this.doccomparado.length > 0) {
//       localStorage.setItem('doccomparado', JSON.stringify(this.doccomparado));
//     }
//     if (this.doccomparado.length === 0 && localStorage.getItem('doccomparado') !== undefined && localStorage.getItem('doccomparado') !== null) {
//       this.doccomparado = JSON.parse(localStorage.getItem('doccomparado'));
//     }
//     this.documents = this.doccomparado;
//     for (const doc of this.documents) {
//       if (this.counter === 0) {
//         this.docname = doc.doc_name;
//         this.doc_reviewer_1 = doc.reviewer;
//         this.doc_reviewed_date_1 = doc.doc_reviewed_date;
//         this.doc_content_1 = doc.doc_content;
//       } else {
//         this.doc_reviewer_2 = doc.reviewer;
//         this.doc_reviewed_date_2 = doc.doc_reviewed_date;
//         this.doc_content_2 = doc.doc_content;
//       }
//       this.counter++;
//     }
//   }

//   goToReview() {
//     this.router.navigateByUrl('/reviewcontent');
//   }
// }
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
import { Router } from '@angular/router';
import { MktZoomServiceService } from './../../services/mkt-zoom-service.service';
import { DataService } from './../../services/data.service';
import * as jsdiff from 'diff';

@Component({
  selector: 'app-doccompare',
  templateUrl: './doccompare.component.html',
  styleUrls: ['./doccompare.component.scss'],
  animations: [
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(400)
      ]),
      transition('* => void', [
        animate(0, style({ opacity: 1 }))
      ])
    ]),
    trigger('scaleForm', [
      transition(':enter', [
        style({ transform: 'scale(1.1)' }),
        animate(300)
      ]),
      transition(':leave', [
        animate(0, style({ transform: 'scale(1.0)' }))
      ])
    ])
  ]
})

export class DoccompareComponent implements OnInit {
  @ViewChild('mainContainer', { static: true }) inputEl: ElementRef;
  doccomparado = [];
  comparado: string;
  counter = 0;
  doc_reviewed_date_1;
  doc_reviewed_date_2;
  doc_reviewer_1: string;
  doc_reviewer_2: string;
  documents = [];
  docname: string;
  doc_content_1: string;
  myComparedDocHeight: number;
  myComparedDocWidth: number;
  doc_content_2: string;
  fragment = document.createDocumentFragment();

  constructor(
    private mktZoomService: MktZoomServiceService,
    public router: Router,
    private data: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('islogged') === '0' || localStorage.getItem('islogged') === undefined || localStorage.getItem('islogged') === null) {
      this.router.navigateByUrl('/loginregistration');
    }
    const result = document.getElementById('result');
    const inputEl: HTMLInputElement = this.inputEl.nativeElement;
    this.myComparedDocHeight = (inputEl.parentElement.parentElement.clientHeight + 100);
    this.myComparedDocWidth = (inputEl.parentElement.parentElement.clientWidth - 40);

    const textAreaComparation = document.createElement('textarea');
    this.data.currentreview.subscribe(doccomparado => this.doccomparado = doccomparado);
    if (this.doccomparado.length > 0) {
      localStorage.setItem('doccomparado', JSON.stringify(this.doccomparado));
    }
    if (this.doccomparado.length === 0 && localStorage.getItem('doccomparado') !== undefined && localStorage.getItem('doccomparado') !== null) {
      this.doccomparado = JSON.parse(localStorage.getItem('doccomparado'));
    }
    this.documents = this.doccomparado;
    for (const doc of this.documents) {
      if (this.counter === 0) {
        this.docname = doc.doc_name;
        this.doc_reviewer_1 = doc.reviewer;
        this.doc_reviewed_date_1 = doc.doc_reviewed_date;
        this.doc_content_1 = doc.doc_content;
      } else {
        this.doc_reviewer_2 = doc.reviewer;
        this.doc_reviewed_date_2 = doc.doc_reviewed_date;
        this.doc_content_2 = doc.doc_content;
      }
      this.counter++;
    }

    const diff = jsdiff.diffWords(this.doc_content_1, this.doc_content_2);
    for (let i = 0; i < diff.length; i++) {

      if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
        const swap = diff[i];
        diff[i] = diff[i + 1];
        diff[i + 1] = swap;
      }

      let node;
      if (diff[i].removed) {
        node = document.createElement('del');
        node.appendChild(document.createTextNode(diff[i].value));
      } else if (diff[i].added) {
        node = document.createElement('ins');
        node.appendChild(document.createTextNode(diff[i].value));
      } else {
        node = document.createElement('normal');
        node.appendChild(document.createTextNode(diff[i].value));
      }
      this.fragment.appendChild(node);
    }
    result.appendChild(this.fragment);
  }

  goToReview() {
    this.router.navigateByUrl('/reviewcontent');
  }
}
