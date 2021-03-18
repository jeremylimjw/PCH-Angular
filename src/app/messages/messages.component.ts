import { Component, OnInit } from '@angular/core';
import { MessageService, TypeEnum } from '../services/message.service';
import {
  trigger,
  style,
  state,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations: [
    trigger('slideInSlideOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate(100)
      ]),
      transition(':leave', [
        animate(100, style({ transform: 'translateX(-100%)' }))
      ])
    ]),
  ]
})
export class MessagesComponent implements OnInit {

  TypeEnum = TypeEnum;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
