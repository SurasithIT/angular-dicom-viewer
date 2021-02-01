import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DicomViewerComponent } from './dicom-viewer/dicom-viewer.component';
import { DicomToolbarComponent } from './dicom-toolbar/dicom-toolbar.component';
import { DicomFileListComponent } from './dicom-file-list/dicom-file-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DicomViewerComponent,
    DicomToolbarComponent,
    DicomFileListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
