import { NgModule, ModuleWithProviders } from "@angular/core";
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';

//Prime NG Modules
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { TabViewModule } from 'primeng/tabview';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { TreeModule } from 'primeng/tree';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToolbarModule } from 'primeng/toolbar';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ChipModule } from 'primeng/chip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ChipsModule } from 'primeng/chips';
import { PickListModule } from 'primeng/picklist';

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";

import { MessagingService } from '../../Services/MethodServices/messaging.service';

//Pipes

//Ngx imports
import { LoadingBarModule } from '@ngx-loading-bar/core';
//import { SizeDetectorComponent } from './size-detector-component/size-detector-component.component';

// jquery datatable
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    NavbarComponent, FooterComponent,
    HeaderComponent,
    ContentComponent,
  ],

  exports: [
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    DialogModule,
    TabViewModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuicklinkModule,
    CardModule,
    TableModule,
    ButtonModule,
    FieldsetModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    TreeModule,
    ProgressBarModule,
    NgxSpinnerModule,
    CheckboxModule,
    ContentComponent,
    LoadingBarModule,
    AutoCompleteModule,
    ConfirmPopupModule,
    ToolbarModule,
    ToggleButtonModule,
    ChipModule,
    InputTextareaModule,
    InputTextModule,
    DataTablesModule,
    ConfirmDialogModule,
    ChipsModule,
    PickListModule,
    DragDropModule,
  ],
  imports: [
    RouterModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    DialogModule,
    TabViewModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuicklinkModule,
    MenubarModule,
    CardModule,
    TableModule,
    ButtonModule,
    FieldsetModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    PanelModule,
    TreeModule,
    ProgressBarModule,
    NgxSpinnerModule,
    CheckboxModule,
    LoadingBarModule,
    AutoCompleteModule,
    ConfirmPopupModule,
    ToolbarModule,
    ToggleButtonModule,
    ChipModule,
    InputTextareaModule,
    InputTextModule,
    DataTablesModule,
    ConfirmDialogModule,
    ChipsModule,
    PickListModule,
    DragDropModule,
  ],
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [MessagingService]
    };
  }
}
