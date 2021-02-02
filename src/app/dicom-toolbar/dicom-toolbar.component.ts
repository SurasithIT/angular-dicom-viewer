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
  tools: Array<Tool> = [
    { toolName: "MagnifyTool", name: "Magnify", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "LengthTool", name: "Length", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "ZoomTool", name: "Zoom", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "ZoomMouseWheelTool", name: "ZoomMouseWheel", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "AngleTool", name: "Angle", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "EraserTool", name: "Eraser", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "PanTool", name: "Pan", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "RotateTool", name: "Rotate", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "WwwcTool", name: "Wwwc", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "WwwcRegionTool", name: "WwwcRegion", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "ZoomTool", name: "Zoom", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "ProbeTool", name: "Probe", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "ArrowAnnotateTool", name: "ArrowAnnotate", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    // { toolName: "BidirectionalTool", name: "Bidirectional", enabled: false , options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "EllipticalRoiTool", name: "EllipticalRoi", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "FreehandRoiTool", name: "FreehandRoi", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "RectangleRoiTool", name: "RectangleRoi", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "StackScrollTool", name: "StackScroll", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "StackScrollMouseWheelTool", name: "StackScrollMouseWheel", enabled: false, options: null, icon: "" }
  ]

  touchTools: Array<Tool> = [
    { toolName: "ZoomTouchPinchTool", name: "ZoomTouchPinch", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "DoubleTapFitToWindowTool", name: "DoubleTapFitToWindow", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "PanMultiTouchTool", name: "PanMultiTouch", enabled: false, options: { mouseButtonMask: 1 }, icon: "" },
    { toolName: "RotateTouchTool", name: "RotateTouch", enabled: false, options: { mouseButtonMask: 1 }, icon: "" }
  ]

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

  selectTool(toolName, name, options, viewerElement?) {
    let tool = this.tools.find(tool => tool.name == name);
    let otherTools = this.tools.filter(tool => tool.name != name && tool.enabled == true);

    console.log("otherTools")
    console.table(otherTools);
    otherTools.forEach(otherTool => {
      cornerstoneTools.setToolPassive(otherTool.name, options);
      otherTool.enabled = false;
    });

    if (tool.enabled) {
      cornerstoneTools.setToolPassive(tool.name, options);
      tool.enabled = false;
      console.log(`${toolName} disabled`)
    } else {
      const Tool = cornerstoneTools[toolName];
      cornerstoneTools.addTool(Tool)
      // cornerstoneTools.addToolForElement(viewerElement, LengthTool)
      cornerstoneTools.setToolActive(name, options)

      tool.enabled = true;
      console.log(`${toolName} enabled`)
    }
  }

  selectTouchTool(toolName, name, options, viewerElement?) {
    let touchTool = this.touchTools.find(tool => tool.name == name);
    let otherTouchTools = this.touchTools.filter(tool => tool.name != name && tool.enabled == true);

    console.log("otherTouchTools")
    console.table(otherTouchTools);
    otherTouchTools.forEach(otherTool => {
      cornerstoneTools.setToolPassive(otherTool.name, options);
      otherTool.enabled = false;
    });

    if (touchTool.enabled) {
      cornerstoneTools.setToolPassive(touchTool.name, options);
      touchTool.enabled = false;
      console.log(`${toolName} disabled`)
    } else {
      const Tool = cornerstoneTools[toolName];
      cornerstoneTools.addTool(Tool)
      // cornerstoneTools.addToolForElement(viewerElement, LengthTool)
      cornerstoneTools.setToolActive(name, options)

      touchTool.enabled = true;
      console.log(`${toolName} enabled`)
    }
  }

  resetTools() {
    console.table(this.tools);
    console.table(this.touchTools);
    this.tools.forEach(tool => {
      if (tool.enabled) {
        cornerstoneTools.setToolDisabled(tool.name);
      }
    });
    this.touchTools.forEach(tool => {
      if (tool.enabled) {
        cornerstoneTools.setToolDisabled(tool.name);
      }
    });
  }
}

interface Tool {
  toolName: string,
  name: string,
  enabled: boolean,
  options: object
  icon: string
}