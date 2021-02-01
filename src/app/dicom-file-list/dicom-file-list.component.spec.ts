import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomFileListComponent } from './dicom-file-list.component';

describe('DicomFileListComponent', () => {
  let component: DicomFileListComponent;
  let fixture: ComponentFixture<DicomFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicomFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicomFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
