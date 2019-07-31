import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariaOpsComponent } from './varia-ops.component';

describe('VariaOpsComponent', () => {
  let component: VariaOpsComponent;
  let fixture: ComponentFixture<VariaOpsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariaOpsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariaOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
