import { Component, effect, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../supabase/chat';
import { Ichat } from '../../../interface/chat.response';
import { DatePipe } from '@angular/common';
import { DeleteModal } from '../../layout/delete-modal/delete-modal';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule, DatePipe, DeleteModal],
  templateUrl: './chat.html',
  styleUrl: './chat.css',
})
export class Chat {
  private auth = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private chat_service = inject(ChatService);
  chats = signal<Ichat[]>([]);

  chatForm!: FormGroup;

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required],
    });

    effect(() => {
      this.onListChat();
    });
  }

  async logout() {
    this.auth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => alert(err.message));
  }

  onSubmit() {
    const formValue = this.chatForm.value.chat_message;
    console.log(formValue);

    this.chat_service
      .chatMessage(formValue)
      .then((res) => {
        console.log(res);
        this.chatForm.reset();
        this.onListChat();
      })
      .catch((err) => {
        alert(err);
      });
  }
  onListChat() {
    this.chat_service
      .ListChat()
      .then((res: Ichat[] | null) => {
        console.log(res);

        if (res && res.length > 0) {
          this.chats.set(res);
        } else {
          alert('No messages found');
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  openDropDown(message: Ichat) {
    console.log(message)
    this.chat_service.selectedChats(message);
  }
}
