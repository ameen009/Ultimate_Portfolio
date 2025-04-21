import { Component } from '@angular/core';
import { WebSocketService } from '../../../service/web-socket.service';
import { CardModule } from 'primeng/card';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collaborative-editor',
  standalone: true,
  imports: [CardModule, CommonModule, QuillModule, FormsModule], // Import EditorModule
  templateUrl: './collaborative-editor.component.html',
  styleUrls: ['./collaborative-editor.component.css']
})
export class CollaborativeEditorComponent {
  userId = 'user-' + Math.floor(Math.random() * 1000);
  editorContent: string = '';
  otherCursors: any[] = [];

  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      // [{ list: 'ordered' }, { list: 'bullet' }],
      // [{ header: [1, 2, 3, false] }],
      // ['link', 'image'],
      ['clean']
    ]
  };

  constructor(private wsService: WebSocketService) {}

  ngOnInit() {
    // WebSocket logic (currently commented out)
    // this.wsService.connect(this.userId);

    // this.wsService.textUpdates$.subscribe((update: { content: any; }) => {
    //   this.editorContent = update.content;
    // });

    // this.wsService.cursorUpdates$.subscribe((cursor: { userId: string, position: number; }) => {
    //   if (cursor.userId !== this.userId) {
    //     this.updateCursor(cursor);
    //   }
    // });
  }

  onTextChange(event: any) {
    const content = event.html || this.editorContent;
    // this.wsService.sendTextUpdate(content);
  }

  updateCursor(cursorData: any) {
    const existing = this.otherCursors.find(c => c.userId === cursorData.userId);
    if (existing) {
      existing.position = cursorData.position;
    } else {
      this.otherCursors.push(cursorData);
    }
  }
}
