import { describe, it, expect, vi } from 'vitest';
import { submitGiftMessage } from '../actions';
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

describe('Gift Messages Server Action', () => {
  it('should save gift message to Supabase', async () => {
    const data = {
      gifterName: 'John Doe',
      note: 'Congratulations!',
      amount: 500,
      items: ['Item 1', 'Item 2'],
      paymentMethod: 'Pix',
      region: 'br',
    };

    const result = await submitGiftMessage(data);
    expect(result.success).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith('gift_messages');
  });
});
