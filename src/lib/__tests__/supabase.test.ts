import { describe, it, expect, vi, beforeEach } from 'vitest';
import { supabase } from '../supabase';

describe('Supabase Client', () => {
  it('should initialize the client', () => {
    expect(supabase).toBeDefined();
    expect(supabase.from).toBeDefined();
  });
});
