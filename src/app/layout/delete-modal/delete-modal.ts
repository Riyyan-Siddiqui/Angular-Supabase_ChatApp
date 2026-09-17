import { Component, effect, inject, signal } from '@angular/core';
import { ChatService } from '../../supabase/chat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.html',
  styleUrl: './delete-modal.css',
})
export class DeleteModal {
  private chat_service = inject(ChatService);
  private router = inject(Router);
  dismiss = signal(false)

  constructor() {
    effect(() => {
      console.log(this.chat_service.savedChat());
    });
  }

  deleteChat() {
    const id = (this.chat_service.savedChat() as { id: string }).id;

    console.log(id);

    this.chat_service
      .deleteChat(id)
      .then(() => {
        let currentURL = this.router.url;
        this.dismiss.set(true);

        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentURL])
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
