import { describe, it, expect, vi } from 'vitest';
import { submitRSVP, createPaymentIntent } from '../actions';
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

vi.mock('stripe', () => {
  return {
    default: class {
      paymentIntents = {
        create: vi.fn(() => Promise.resolve({ client_secret: 'test_secret' })),
      };
    },
  };
});

describe('Server Actions', () => {
  beforeEach(() => {
    process.env.STRIPE_SECRET_KEY = 'sk_test_mock';
  });
  describe('submitRSVP', () => {
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

  describe('createPaymentIntent', () => {
    it('should create a payment intent successfully', async () => {
      const result = await createPaymentIntent(1000);
      expect(result.success).toBe(true);
      expect(result.clientSecret).toBe('test_secret');
    });
  });
});
