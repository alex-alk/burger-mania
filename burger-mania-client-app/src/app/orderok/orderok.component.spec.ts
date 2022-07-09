import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderokComponent } from './orderok.component';

describe('OrderokComponent', () => {
  let component: OrderokComponent;
  let fixture: ComponentFixture<OrderokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
