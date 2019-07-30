import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DnDComponent } from './dn-d.component';

describe('DnDComponent', () => {
  let component: DnDComponent;
  let fixture: ComponentFixture<DnDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DnDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DnDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
