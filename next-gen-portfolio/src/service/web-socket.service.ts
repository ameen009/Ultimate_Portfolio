import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import { Subject } from 'rxjs';
import SockJS from 'sockjs-client'

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient!: Client;
  private userId!: string;

  private textUpdateSubject = new Subject<{ content: string }>();
  private cursorUpdateSubject = new Subject<{ userId: string, position: number, color: string }>();

  textUpdates$ = this.textUpdateSubject.asObservable();
  cursorUpdates$ = this.cursorUpdateSubject.asObservable();

  connect(userId: string) {
    this.userId = userId;

    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
      debug: () => {}
    });

    this.stompClient.onConnect = () => {
      console.log('Connected');

      this.stompClient.subscribe('/topic/document/1', (message: IMessage) => {
        this.textUpdateSubject.next(JSON.parse(message.body));
      });

      this.stompClient.subscribe('/topic/cursor/1', (message: IMessage) => {
        this.cursorUpdateSubject.next(JSON.parse(message.body));
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('STOMP error:', frame);
    };

    this.stompClient.activate();
  }

  sendTextUpdate(content: string) {
    this.stompClient.publish({
      destination: '/app/document/1',
      body: JSON.stringify({ userId: this.userId, content })
    });
  }

  sendCursorUpdate(position: number) {
    this.stompClient.publish({
      destination: '/app/cursor/1',
      body: JSON.stringify({
        userId: this.userId,
        position,
        color: this.getColorForUser(this.userId)
      })
    });
  }

  private getColorForUser(userId: string): string {
    const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8'];
    let index = parseInt(userId.replace(/[^\d]/g, ''), 10) % colors.length;
    return colors[index];
  }
}
