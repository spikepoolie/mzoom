import { MktZoomServiceService } from './services/mkt-zoom-service.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ApprovecontentComponent } from './components/approvecontent/approvecontent.component';
import { ContenthelperComponent } from './components/contenthelper/contenthelper.component';
import { ContenttemplateComponent } from './components/contenttemplate/contenttemplate.component';
import { CreatecontentComponent } from './components/createcontent/createcontent.component';
import { DoccompareComponent } from './components/doccompare/doccompare.component';
import { DocdashboardComponent } from './components/docdashboard/docdashboard.component';
import { DochistoryComponent } from './components/dochistory/dochistory.component';
import { LoginregistrationComponent } from './components/loginregistration/loginregistration.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PublishcontentComponent } from './components/publishcontent/publishcontent.component';
import { RecoverComponent } from './components/recover/recover.component';
import { RegisterComponent } from './components/register/register.component';
import { ReviewcontentComponent } from './components/reviewcontent/reviewcontent.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoaccessComponent } from './components/noaccess/noaccess.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SafePipe } from './safe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ApprovecontentComponent,
    ContenthelperComponent,
    ContenttemplateComponent,
    CreatecontentComponent,
    DoccompareComponent,
    DocdashboardComponent,
    DochistoryComponent,
    LoginregistrationComponent,
    LogoutComponent,
    PublishcontentComponent,
    RecoverComponent,
    RegisterComponent,
    ReviewcontentComponent,
    NavbarComponent,
    NoaccessComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    EditorModule,
    HttpModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [MktZoomServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

