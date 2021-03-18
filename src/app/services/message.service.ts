import { Injectable } from '@angular/core';
import { timer } from "rxjs";

export enum TypeEnum {
  Error,
  Warning,
  Success
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  counter: number;
  messages: any = [];

  constructor() {
    this.counter = 1;
  }

  addMessage(type: TypeEnum, title: string, description: string) {
    let message = {
      id: this.counter,
      type: type,
      title: title,
      description: description
    }
    this.messages.push(message);
    this.counter++;
  }

  addTemporaryMessage(type: TypeEnum, title: string, description: string) {
    let message = {
      id: this.counter,
      type: type,
      title: title,
      description: description
    }
    this.messages.push(message);
    this.counter++;
    
    timer(3000).subscribe(x => {
      this.messages = this.messages.filter(y => y.id != message.id);
    });
  }

  deleteMessage(id: number) {
    this.messages = this.messages.filter(x => x.id != id);
  }
}

