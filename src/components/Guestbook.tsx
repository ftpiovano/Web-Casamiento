'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Section, Typography, Card, Button } from './Base';
import { submitGuestbookMessage, getGuestbookMessages } from '@/app/actions';

/**
 * Interface for a guest message coming back from Supabase.
 */
interface Message {
  id: string;
  name: string;
  text: string;
  created_at: string;
}

/**
 * Guestbook component for guests to leave and view messages.
 * Reads from and writes to Supabase via server actions.
 * @return {JSX.Element} The rendered guestbook.
 */
export function Guestbook() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({ name: '', text: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Loads messages from Supabase on mount.
     */
    const load = async () => {
      const result = await getGuestbookMessages();
      if (result.success && result.data) {
        setMessages(result.data as Message[]);
      }
      setIsLoading(false);
    };
    load();
  }, []);

  /**
   * Submits a new message to Supabase and prepends it locally.
   * @param {React.FormEvent} e The form event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = formData.name.trim();
    const text = formData.text.trim();
    if (!name || !text) return;

    setIsSubmitting(true);
    setError(null);

    const result = await submitGuestbookMessage({ name, text });

    if (result.success) {
      // Optimistic prepend so the guest sees their message immediately.
      // A reload picks up the canonical row from Supabase.
      const optimistic: Message = {
        id: `optimistic-${Date.now()}`,
        name,
        text,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [optimistic, ...prev]);
      setFormData({ name: '', text: '' });
    } else {
      setError(result.error || 'Erro ao enviar mensagem. Tente novamente.');
    }

    setIsSubmitting(false);
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('pt-BR');
    } catch {
      return '';
    }
  };

  return (
    <Section id='messages' className='bg-accent/5'>
      <Typography as='h2'>Mural de Mensagens</Typography>

      <div className='max-w-4xl mx-auto'>
        <Card className='mb-12'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <input
              required
              disabled={isSubmitting}
              placeholder='Seu Nome'
              className='w-full bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 disabled:opacity-50'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <textarea
              required
              disabled={isSubmitting}
              placeholder='Deixe uma mensagem para o casal...'
              className='w-full bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50 min-h-[100px] disabled:opacity-50'
              value={formData.text}
              onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            />
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Enviando…' : 'Enviar Mensagem'}
            </Button>
            {error && <p className='text-sm text-red-600'>{error}</p>}
          </form>
        </Card>

        <div className='grid gap-6'>
          {isLoading ? (
            <Typography className='text-center opacity-40 py-12'>
              Carregando mensagens…
            </Typography>
          ) : messages.length === 0 ? (
            <Typography className='text-center opacity-40 py-12'>
              Seja o primeiro a deixar uma mensagem!
            </Typography>
          ) : (
            messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i, 6) * 0.05 }}
              >
                <Card className='py-6 px-8'>
                  <div className='flex justify-between items-center mb-4'>
                    <Typography as='h4' className='mb-0 text-primary'>
                      {msg.name}
                    </Typography>
                    <span className='text-xs text-foreground/40'>
                      {formatDate(msg.created_at)}
                    </span>
                  </div>
                  <Typography className='italic'>“{msg.text}”</Typography>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </Section>
  );
}
