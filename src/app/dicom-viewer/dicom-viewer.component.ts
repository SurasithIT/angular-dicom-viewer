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
  viewport;
  imageId = "https://telemedia.dms.go.th/media-staging/2021/01/4d6d3116-0bd5-41ac-b43b-cac904c15aa8.dcm";
  imageIds = [
    'https://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm',
    'https://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm',
    'https://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
  ]
  initialIndex: number = 0;
  renderedIndex: number = 0;

  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    cornerstone.resize(this.viewer.nativeElement, true);
  }

  ngOnInit(): void {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
    console.log("this.images[0] => ", this.imageIds)

  }

  ngAfterViewInit(): void {
    let viewerElement = this.viewer.nativeElement;

    console.log(viewerElement)
    cornerstone.enable(viewerElement);
    this.renderImage(viewerElement, this.imageIds[0]);
  }

  nextImage() {
    let viewerElement = this.viewer.nativeElement;
    if (this.renderedIndex + 1 < this.imageIds.length) {
      this.renderImage(viewerElement, this.imageIds[this.renderedIndex + 1]);
      this.renderedIndex += 1;
    }
  }

  prevImage() {
    let viewerElement = this.viewer.nativeElement;
    if (this.renderedIndex - 1 >= 0) {
      this.renderImage(viewerElement, this.imageIds[this.renderedIndex - 1]);
      this.renderedIndex -= 1;
    }

  }

  renderImage(element, imageId) {
    cornerstone.loadImage("wadouri:" + imageId)
      .then(imageData => {
        console.log("imageData => ", imageData);
        cornerstone.displayImage(element, imageData);
        let viewport = cornerstone.getViewport(element);
        console.log("viewport => ", viewport);
        this.viewport = viewport;
      }).catch(error => { console.error(error) });
  }

  resetImage() {
    let viewerElement = this.viewer.nativeElement;
    let image = cornerstone.getImage(viewerElement)
    const defaultViewport = cornerstone.getDefaultViewportForImage(viewerElement, image)
    let viewport = cornerstone.getViewport(viewerElement)
    viewport.voi.windowWidth = defaultViewport.voi.windowWidth
    viewport.voi.windowCenter = defaultViewport.voi.windowCenter
    viewport.invert = false
    cornerstone.setViewport(viewerElement, defaultViewport)
  }


}
