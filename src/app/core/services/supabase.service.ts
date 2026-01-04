import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'
import { createClient, SupabaseClient, Session, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private _supabase: SupabaseClient;

  constructor() {
    this._supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

    // Sign up a new user with email and password
    async signUp(email: string, password: string) {
      return await this._supabase.auth.signUp({ email, password });
    }
  
    // Sign in an existing user with email and password
    async signIn(email: string, password: string) {
      return await this._supabase.auth.signInWithPassword({ email, password });
    }
  
    // Sign out the current user
    async signOut() {
      return await this._supabase.auth.signOut();
    }
  
    // Get the current session
    getSession() {
      return this._supabase.auth.getSession();
    }
  
    // Subscribe to auth state changes (login, logout, token refresh)
    onAuthStateChange(callback: (event: string, session: Session | null) => void) {
      return this._supabase.auth.onAuthStateChange(callback);
    }

}
