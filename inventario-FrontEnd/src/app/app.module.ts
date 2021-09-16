import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule  } from "@angular/common/http";
import { DxButtonModule } from 'devextreme-angular';
import { DxTabPanelModule } from 'devextreme-angular';
import { DxDataGridModule } from 'devextreme-angular';
import { DxFormModule } from 'devextreme-angular';
import { DxSelectBoxModule } from 'devextreme-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import dxSelectBox from 'devextreme/ui/select_box';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DxButtonModule,
    DxTabPanelModule,
    DxDataGridModule,
    DxFormModule,
    DxSelectBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
