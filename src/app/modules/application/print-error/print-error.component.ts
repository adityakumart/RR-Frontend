import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.scss']
})
export class PrintErrorComponent implements OnInit{
  @Input() control: any;
  @Input() ctrlName: any;
  allcontrol: any;
  constructor(){
  }

  ngOnInit(){
    this.allcontrol = this.control;
  }
}
