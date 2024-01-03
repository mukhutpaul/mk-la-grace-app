import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, SPINNER } from 'ngx-ui-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { WrapperComponent } from './layouts/wrapper/wrapper.component';
import { UserComponent } from './pages/user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { FraisComponent } from './pages/frais/frais.component';
import { FFraisComponent } from './Formulaires/ffrais/ffrais.component';
import { EditFraisComponent } from './Formulaires/edit-frais/edit-frais.component';
import {  MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormationComponent } from './pages/formation/formation.component';
import { AddEditFormationComponent } from './Formulaires/add-edit-formation/add-edit-formation.component';
import { TrancheComponent } from './pages/tranche/tranche.component';
import { AddEditTrancheComponent } from './Formulaires/add-edit-tranche/add-edit-tranche.component';
import { StagiaireComponent } from './pages/stagiaire/stagiaire.component';
import { AddEditStagiaireComponent } from './Formulaires/add-edit-stagiaire/add-edit-stagiaire.component';
import { AddEditPaiementComponent } from './Formulaires/add-edit-paiement/add-edit-paiement.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { AddEditUserComponent } from './Formulaires/add-edit-user/add-edit-user.component';
import { RecuComponent } from './rapport/recu/recu.component';
import { Select2Module } from 'ng-select2-component';





const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text:"Loading...",
  textColor:"#3c65e8",
  textPosition:"center-center",
  pbColor:"#3c65e8",
  bgsColor:"#3c65e8",
  fgsColor:"#3c65e8",
  fgsType:SPINNER.ballSpinClockwiseFadeRotating,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    WrapperComponent,
    UserComponent,
    FraisComponent,
    FFraisComponent,
    EditFraisComponent,
    FormationComponent,
    AddEditFormationComponent,
    TrancheComponent,
    AddEditTrancheComponent,
    StagiaireComponent,
    AddEditStagiaireComponent,
    AddEditPaiementComponent,
    PaiementComponent,
    AddEditUserComponent,
    RecuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    Select2Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
