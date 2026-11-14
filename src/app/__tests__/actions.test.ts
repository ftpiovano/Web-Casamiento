import { describe, it, expect, vi } from 'vitest';
import { submitRSVP, createPaymentIntent, findInvite, getRSVPs, getGiftMessages, validateAdminPassword } from '../actions';
import { supabase } from '@/lib/supabase';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        error: null,
      })),
    })),
    rpc: vi.fn(),
  },
}));

vi.mock('stripe', () => {
  return {
    default: class {
      constructor() {}
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
        phone: '+55 11 99999-9999',
      };

      const result = await submitRSVP(data);
      expect(result.success).toBe(true);
      expect(supabase.from).toHaveBeenCalledWith('rsvps');
    });
  });

  describe('findInvite', () => {
    it('normalizes names and phones before calling the database function', async () => {
      vi.mocked(supabase.rpc).mockResolvedValue({
        data: [{ invite_name: 'X', rsvp_url: 'https://assessoriavip.com.br/rsvp/abc' }], error: null,
      } as never);
      const byName = await findInvite('  ÁLDERI   Lima ');
      expect(supabase.rpc).toHaveBeenLastCalledWith('find_invite', { q: 'alderi lima' });
      expect(byName).toMatchObject({ success: true, found: true, url: 'https://assessoriavip.com.br/rsvp/abc' });

      await findInvite('+55 (71) 99682-1462');
      expect(supabase.rpc).toHaveBeenLastCalledWith('find_invite', { q: '5571996821462' });
    });

    it('does not query for too-short input and rejects foreign URLs', async () => {
      vi.mocked(supabase.rpc).mockClear();
      expect(await findInvite('maria')).toEqual({ success: true, found: false });
      expect(supabase.rpc).not.toHaveBeenCalled();

      vi.mocked(supabase.rpc).mockResolvedValue({
        data: [{ invite_name: 'X', rsvp_url: 'https://evil.example/phish' }], error: null,
      } as never);
      expect(await findInvite('alderi lima')).toEqual({ success: true, found: false });
    });
  });

  describe('admin reads', () => {
    it('refuses to read without the right admin password (and never hits the DB)', async () => {
      process.env.ADMIN_PASSWORD = 'secret-pw';
      vi.mocked(supabase.rpc).mockClear();
      expect(await getRSVPs('wrong')).toEqual({ success: false, error: 'Unauthorized' });
      expect(await getGiftMessages('')).toEqual({ success: false, error: 'Unauthorized' });
      expect(supabase.rpc).not.toHaveBeenCalled();
    });

    it('fails closed when ADMIN_PASSWORD is not configured', async () => {
      delete process.env.ADMIN_PASSWORD;
      expect((await validateAdminPassword('')).success).toBe(false);
      expect((await validateAdminPassword('undefined')).success).toBe(false);
      expect(await getGiftMessages('anything')).toEqual({ success: false, error: 'Unauthorized' });
    });

    it('reads through the token-protected DB functions when authorized', async () => {
      process.env.ADMIN_PASSWORD = 'secret-pw';
      process.env.ADMIN_DB_TOKEN = 'db-token';
      vi.mocked(supabase.rpc).mockResolvedValue({ data: [{ id: '1' }], error: null } as never);
      expect(await getGiftMessages('secret-pw')).toEqual({ success: true, data: [{ id: '1' }] });
      expect(supabase.rpc).toHaveBeenLastCalledWith('admin_list_gifts', { p_token: 'db-token' });
      await getRSVPs('secret-pw');
      expect(supabase.rpc).toHaveBeenLastCalledWith('admin_list_rsvps', { p_token: 'db-token' });
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
