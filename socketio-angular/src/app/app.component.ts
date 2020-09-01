import { Component } from '@angular/core';
import { SocketioService } from './socketio.service';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  socket;
  message = '';
  messages;
  title = 'socketio-angular';
  constructor(private socketService: SocketioService) {}

  ngOnInit() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socketService.setupSocketConnection();
  }

  sendMsg() {
    this.socketService.sendMessage(this.message);
    this.receiveMessage();
  }
  receiveMessage() {
    this.socket.on('recivedMessage', (data: string) => {
      console.log(data);
      this.messages = data;
      this.message = '';
    });
  }
}

