import { describe, it, expect, vi } from 'vitest';
import { submitRSVP } from '../actions';
import { supabase } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        error: null,
      })),
    })),
  },
}));

describe('Server Actions', () => {
  it('should submit RSVP successfully', async () => {
    const data = {
      name: 'Test Guest',
      email: 'test@example.com',
      attending: 'yes',
      adults: 2,
      kids: 0,
      notes: 'No notes',
    };

    const result = await submitRSVP(data);
    expect(result.success).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith('rsvps');
  });
});
