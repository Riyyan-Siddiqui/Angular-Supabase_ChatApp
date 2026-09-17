import { Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Ichat } from '../../interface/chat.response';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private supabase: SupabaseClient;
  public savedChat = signal({})

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  async chatMessage(message: string) {
    try {
      const { data, error } = await this.supabase.from('chat').insert({ message });

      if (error) throw error;
      return data;
    } catch (err: string | any) {
      alert(err.message);
      return null;
    }
  }

  async ListChat() {
    const { data, error } = await this.supabase.from('chat').select('*, user(*)');

    if (error) {
      throw error;
    }

    return data;
  }
  catch(error: any) {
    throw error;
  }

  selectedChats(message: Ichat) {
    this.savedChat.set(message);
  }


  async deleteChat(id: string) {
    const data = await this.supabase.from('chat').delete().eq('id', id);

    return data;
  }
}
