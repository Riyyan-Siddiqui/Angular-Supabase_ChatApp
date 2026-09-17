import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private router = inject(Router);

  private supabase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor() {
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('AUTH EVENT:', event);
      console.log('SESSION:', session);

      if (session?.user) {
        this.router.navigate(['/chat']);
      }
    });
  }

  async isLoggedIn(): Promise<boolean> {
    const { data, error } = await this.supabase.auth.getSession();

    if (error) {
      console.error('Session error:', error);
      return false;
    }

    return !!data.session;
  }

  async signInWithGoogle() {
    await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }

  async signOut() {
    await this.supabase.auth.signOut();

    this.router.navigate(['/login']);
  }
}