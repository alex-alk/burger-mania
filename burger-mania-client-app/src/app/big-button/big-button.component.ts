import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'big-button',
  templateUrl: './big-button.component.html',
  styleUrls: ['./big-button.component.css']
})
export class BigButtonComponent implements OnInit {
  
  @Input() label: String = "";
  @Input() disabled: boolean = false;
  @Input() displaySpinner: boolean = false;
  
  constructor() { }

  ngOnInit() {
  }

}
