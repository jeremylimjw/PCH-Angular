import { Injectable } from '@angular/core';
import { timer } from "rxjs";

export enum TypeEnum {
  Error,
  Warning,
  Success
}

interface Message {
  id: number;
  type: TypeEnum;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  counter: number;
  messages: Message[];

  constructor() {
    this.counter = 1;
    this.messages = [];
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
      this.messages = this.messages.filter(x => x.id != message.id);
    });
  }

  deleteMessage(id: number) {
    this.messages = this.messages.filter(x => x.id != id);
  }
}

