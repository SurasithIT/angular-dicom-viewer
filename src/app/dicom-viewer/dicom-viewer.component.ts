import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import * as cornerstoneWebImageLoader from "cornerstone-web-image-loader";
import * as cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import * as dicomParser from 'dicom-parser';

@Component({
  selector: 'app-dicom-viewer',
  templateUrl: './dicom-viewer.component.html',
  styleUrls: ['./dicom-viewer.component.scss']
})


export class DicomViewerComponent implements OnInit {
  @ViewChild("viewer") viewer: ElementRef;
  config = {
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
  }
  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    cornerstone.resize(this.viewer.nativeElement, true);
  }

  ngOnInit(): void {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  }

  ngAfterViewInit(): void {
    let imageId = "https://telemedia.dms.go.th/media-staging/2021/01/4d6d3116-0bd5-41ac-b43b-cac904c15aa8.dcm";
    let viewerElement = this.viewer.nativeElement;

    console.log(viewerElement)
    cornerstone.enable(viewerElement);

    cornerstone.loadImage("wadouri:" + imageId).then(imageData => {
      console.log("imageData => ", imageData);
      cornerstone.displayImage(viewerElement, imageData);
    }).catch(error => { console.error(error) });
  }
}
