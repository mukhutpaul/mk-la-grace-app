import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { FraisComponent } from './pages/frais/frais.component';
import { FFraisComponent } from './Formulaires/ffrais/ffrais.component';
import { EditFraisComponent } from './Formulaires/edit-frais/edit-frais.component';
import { FormationComponent } from './pages/formation/formation.component';
import { TrancheComponent } from './pages/tranche/tranche.component';
import { StagiaireService } from './services/stagiaire.service';
import { StagiaireComponent } from './pages/stagiaire/stagiaire.component';
import { PaiementComponent } from './pages/paiement/paiement.component';
import { AddEditPaiementComponent } from './Formulaires/add-edit-paiement/add-edit-paiement.component';
import { AddEditUserComponent } from './Formulaires/add-edit-user/add-edit-user.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'frais', component: FraisComponent },
  { path: 'ffrais', component: FFraisComponent },
  { path: 'editfrais', component: EditFraisComponent},
  { path: 'formation', component: FormationComponent},
  { path: 'tranche', component: TrancheComponent},
  { path: 'stagiaire', component: StagiaireComponent},
  { path: 'paiement', component: PaiementComponent},
  { path: 'editPaie', component: AddEditPaiementComponent},
  { path: 'editUser', component: AddEditUserComponent},
 
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
