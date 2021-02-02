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
  viewport;
  imageId = "https://telemedia.dms.go.th/media-staging/2021/01/4d6d3116-0bd5-41ac-b43b-cac904c15aa8.dcm";
  imageIds = [
    'https://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm',
    'https://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm',
    'https://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
  ]
  initialIndex: number = 0;
  renderedIndex: number = 0;
  play;
  fileToUpload: File = null;
  constructor() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    cornerstone.resize(this.viewer.nativeElement, true);
  }

  ngOnInit(): void {
    cornerstoneWebImageLoader.external.cornerstone = cornerstone
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser

    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init({
      mouseEnabled: true,
      touchEnabled: true,
      globalToolSyncEnabled: true,
      showSVGCursors: true,
    });
  }

  ngAfterViewInit(): void {
    let viewerElement = this.viewer.nativeElement;

    console.log(viewerElement)
    cornerstone.enable(viewerElement);
    this.renderImage(viewerElement, this.imageIds[0]);
  }

  handleFileInput(files: FileList) {
    console.log(files)
    // this.fileToUpload = files.item(0);
  }

  nextImage() {
    let viewerElement = this.viewer.nativeElement;
    if (this.renderedIndex + 1 < this.imageIds.length) {
      this.renderImage(viewerElement, this.imageIds[this.renderedIndex + 1]);
      this.renderedIndex += 1;
    }
    else {
      this.renderImage(viewerElement, this.imageIds[0]);
      this.renderedIndex = 0;
    }
  }

  playImage() {
    this.play = setInterval(() => {
      this.nextImage()
    }, 500)
  }

  pauseImage() {
    clearInterval(this.play);
  }

  prevImage() {
    let viewerElement = this.viewer.nativeElement;
    if (this.renderedIndex - 1 >= 0) {
      this.renderImage(viewerElement, this.imageIds[this.renderedIndex - 1]);
      this.renderedIndex -= 1;
    }
  }

  renderImage(element, imageId) {
    const imageIds = this.imageIds
    let stack = { currentImageIdIndex: 0, imageIds: imageIds };

    const synchronizer = new cornerstoneTools.Synchronizer(
      'cornerstoneimagerendered',
      cornerstoneTools.stackScrollSynchronizer
      // StackScrollTool
    );
    console.log("synchronizer => ", synchronizer)

    console.log(stack)
    cornerstone.loadImage("wadouri:" + imageId)
      .then(imageData => {
        console.log("imageData => ", imageData);
        console.log("Patient Name => ", imageData.data.string("x00020002"))
        cornerstone.displayImage(element, imageData);
        let viewport = cornerstone.getViewport(element);
        console.log("viewport => ", viewport);
        this.viewport = viewport;

        cornerstoneTools.addStackStateManager(element, ['stack']);
        cornerstoneTools.addToolState(element, 'stack', stack);
      })
      .then((result) => {

        const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool;
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.setToolActive('StackScrollMouseWheel', {
          mouseButtonMask: {},
          synchronizationContext: synchronizer,
        });
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
