import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-collapsible-container',
  templateUrl: './collapsible-container.component.html',
  styleUrls: ['./collapsible-container.component.scss'],
  animations: [
    trigger('hideShowContainer', [
      transition(':enter', [
        style({height: 0, marginTop: 0}),
        animate('225ms ease-in-out', style({height: '*', marginTop: '*'}))
      ]),
      transition(':leave', [
        animate('225ms ease-in-out', style({height: 0, marginTop: 0}))
      ])
    ]),
    trigger('addRemoveBorder', [
      state('showBorder', style({borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px'})),
      state('hideBorder', style({borderBottomRightRadius: '*', borderBottomLeftRadius: '*'})),
      transition('showBorder <=> hideBorder', animate('225ms ease-in-out'))
    ])
  ]
})
export class CollapsibleContainerComponent implements OnInit {

  constructor() { }

  @Input() headerText = '';

  public showContent = true;

  ngOnInit() {
  }

}
