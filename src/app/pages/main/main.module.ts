import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimulatorComponent } from './simulator/simulator.component';
import { PersonalComponent } from './personal/personal.component';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main.component';
import { LoanFormComponent } from './loan-form/loanform.component';
import { SavedLoanComponent } from './saved-loan/saved-loan.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    SimulatorComponent,
    PersonalComponent,
    MainComponent,
    LoanFormComponent,
    SavedLoanComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule
  ],
  providers: [],

})
export class MainModule { }
