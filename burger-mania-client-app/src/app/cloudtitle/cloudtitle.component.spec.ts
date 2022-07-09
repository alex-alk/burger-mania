import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudtitleComponent } from './cloudtitle.component';

describe('CloudtitleComponent', () => {
  let component: CloudtitleComponent;
  let fixture: ComponentFixture<CloudtitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudtitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
