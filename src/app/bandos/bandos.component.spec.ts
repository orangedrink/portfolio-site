import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandosComponent } from './bandos.component';

describe('BandosComponent', () => {
  let component: BandosComponent;
  let fixture: ComponentFixture<BandosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
