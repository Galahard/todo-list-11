import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav/nav.component';
import {TaskComponent} from './task/task/task.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from 'ngx-pagination';
import {ModalComponent} from './task/modal/modal.component';
import {EditTaskComponent} from './task/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TaskComponent,
    ModalComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
