import { DoccompareComponent } from './components/doccompare/doccompare.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginregistrationComponent } from './components/loginregistration/loginregistration.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverComponent } from './components/recover/recover.component';
import { ContenthelperComponent } from './components/contenthelper/contenthelper.component';
import { CreatecontentComponent } from './components/createcontent/createcontent.component';
import { ReviewcontentComponent } from './components/reviewcontent/reviewcontent.component';
import { PublishcontentComponent } from './components/publishcontent/publishcontent.component';
import { ApprovecontentComponent } from './components/approvecontent/approvecontent.component';
import { DocdashboardComponent } from './components/docdashboard/docdashboard.component';
import { NoaccessComponent } from './components/noaccess/noaccess.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: 'docentries', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent },
  { path: 'login', component: LoginregistrationComponent },
  { path: 'contenthelper', component: ContenthelperComponent },
  { path: 'createcontent', component: CreatecontentComponent },
  { path: 'approvecontent', component: ApprovecontentComponent },
  { path: 'reviewcontent', component: ReviewcontentComponent },
  { path: 'publishcontent', component: PublishcontentComponent },
  { path: 'dashboard', component: DocdashboardComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'noaccess', component: NoaccessComponent },
  { path: 'doccompare', component: DoccompareComponent },
  { path: '**', component: LoginregistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
