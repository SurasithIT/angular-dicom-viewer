import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import { DicomViewerComponent } from '../dicom-viewer/dicom-viewer.component';

@Component({
  selector: 'app-dicom-toolbar',
  templateUrl: './dicom-toolbar.component.html',
  styleUrls: ['./dicom-toolbar.component.scss']
})
export class DicomToolbarComponent implements OnInit {
  options = { mouseButtonMask: 1 }

  constructor() { }

  ngOnInit(): void {
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init({
      mouseEnabled: true,
      touchEnabled: true,
      globalToolSyncEnabled: false,
      showSVGCursors: true,
    });

  }

  magnifyTool() {
    const MagnifyTool = cornerstoneTools.MagnifyTool;
    cornerstoneTools.addTool(MagnifyTool);
    cornerstoneTools.setToolActive('Magnify', this.options)
  }

  lengthTool() {
    const LengthTool = cornerstoneTools.LengthTool;
    cornerstoneTools.addTool(LengthTool);
    cornerstoneTools.setToolActive('Length', this.options)
  }

  zoomTouchPinchTool() {
    const ZoomTouchPinchTool = cornerstoneTools.ZoomTouchPinchTool;
    cornerstoneTools.addTool(ZoomTouchPinchTool)
    cornerstoneTools.setToolActive('ZoomTouchPinch', this.options)
  }

  angleTool() {
    const AngleTool = cornerstoneTools['AngleTool'];
    cornerstoneTools.addTool(AngleTool)
    cornerstoneTools.setToolActive('Angle', { mouseButtonMask: 1 })
  }

  eraserTool() {
    const EraserTool = cornerstoneTools.EraserTool;
    cornerstoneTools.addTool(EraserTool)
    cornerstoneTools.setToolActive('Eraser', this.options)
  }

  doubleTapFitToWindowTool() {
    const DoubleTapFitToWindowTool = cornerstoneTools.DoubleTapFitToWindowTool;
    cornerstoneTools.addTool(DoubleTapFitToWindowTool)
    cornerstoneTools.setToolActive('DoubleTapFitToWindow', this.options)

  }
}