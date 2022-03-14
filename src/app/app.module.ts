import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompararComponent } from './components/Comparar/Comparar.component';
import { MovilComponent } from './components/movil/movil.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavBarComponent } from './components/navBar/navBar.component';
import {MatIconModule} from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ChartComponent} from 'src/app/components/chart/chart.component'
import { NgxChartsModule }from '@swimlane/ngx-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    MovilComponent,
    CompararComponent,
    NavBarComponent,
    SidebarComponent,
    ChartComponent,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    NgxSliderModule,
    MatDividerModule,
    MatPaginatorModule,
    NgxChartsModule,
    ReactiveFormsModule,
    MatSnackBarModule
    
  ],
  providers: [CompararComponent,ChartComponent,
  {provide: MAT_DIALOG_DATA,useValue:{}}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
