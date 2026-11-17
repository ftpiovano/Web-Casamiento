'use client';

import { useState, useEffect } from 'react';
import { Section, Typography, Card, Button } from '@/components/Base';
import { getRSVPs, getGiftMessages, validateAdminPassword } from '@/app/actions';
import { Users, UserCheck, Gift, Download } from 'lucide-react';

const CURRENCY: Record<string, { code: string; symbol: string; locale: string }> = {
  br: { code: 'BRL', symbol: 'R$', locale: 'pt-BR' },
  ar: { code: 'ARS', symbol: '$', locale: 'es-AR' },
  en: { code: 'GBP', symbol: '£', locale: 'en-GB' },
};

/**
 * Formats a gift amount with the currency of the region it was sent from.
 * @param {number} amount The amount.
 * @param {string} region 'br' | 'ar' | 'en'.
 * @return {string} e.g. "R$ 400,00".
 */
function money(amount: number, region: string) {
  const c = CURRENCY[region] || CURRENCY.br;
  return `${c.symbol} ${Number(amount).toLocaleString(c.locale, { minimumFractionDigits: 2 })}`;
}

/**
 * Escapes one CSV cell.
 * @param {unknown} v The value.
 * @return {string} The quoted cell.
 */
function csvCell(v: unknown) {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

const STATUS: Record<string, { label: string; cls: string }> = {
  pix_copiado: { label: 'Copiou o Pix', cls: 'bg-amber-100 text-amber-800' },
  pagamento_informado: { label: 'Informou pagamento', cls: 'bg-green-100 text-green-700' },
};

/**
 * One row per checkout: rows sharing an attempt_id collapse into the most recent one
 * (the list arrives newest first). Rows without attempt_id are kept as they are.
 * @param {any[]} rows Gift rows, newest first.
 * @return {any[]} Collapsed rows.
 */
function collapseGifts(rows: any[]) {
  const seen = new Set<string>();
  return rows.filter((g) => {
    if (!g.attempt_id) return true;
    if (seen.has(g.attempt_id)) return false;
    seen.add(g.attempt_id);
    return true;
  });
}

/**
 * Admin dashboard page for tracking guest confirmations and gifts.
 * @return {JSX.Element} The rendered admin page.
 */
export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [gifts, setGifts] = useState<any[]>([]);
  const [tab, setTab] = useState<'rsvps' | 'gifts'>('gifts');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw');
    if (saved) {
      setPassword(saved);
      setIsAuthenticated(true);
    }
    setIsChecking(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await validateAdminPassword(password);
    if (result.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_pw', password);
    } else {
      alert('Senha incorreta');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const [r, g] = await Promise.all([getRSVPs(password), getGiftMessages(password)]);
        if (r.success) setRsvps(r.data || []);
        if (g.success) setGifts(g.data || []);
        if (r.error === 'Unauthorized') {
          sessionStorage.removeItem('admin_pw');
          setIsAuthenticated(false);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isAuthenticated, password]);

  /** Downloads the gift list as a spreadsheet-friendly CSV. */
  const downloadGiftsCsv = () => {
    const header = ['Data', 'Nome', 'Presentes', 'Valor', 'Moeda', 'Pagamento', 'Status', 'Idioma', 'Mensagem'];
    const rows = giftRows.map((g) => [
      new Date(g.created_at).toLocaleString('pt-BR'),
      g.name,
      g.items,
      Number(g.amount).toFixed(2),
      (CURRENCY[g.region] || CURRENCY.br).code,
      g.payment_method,
      (STATUS[g.status]?.label) || 'Registrado',
      g.region,
      g.note,
    ]);
    const csv = '\uFEFF' + [header, ...rows].map((r) => r.map(csvCell).join(';')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'presentes.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isChecking) {
    return <div className='min-h-screen bg-background' />;
  }

  if (!isAuthenticated) {
    return (
      <Section className='min-h-screen flex items-center justify-center'>
        <Card className='max-w-md w-full'>
          <Typography as='h2'>Admin Login</Typography>
          <form onSubmit={handleLogin} className='space-y-4'>
            <input
              type='password'
              placeholder='Senha de acesso'
              className='w-full bg-accent/5 border border-accent/20 rounded-lg px-4 py-3 outline-none focus:border-primary/50'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' className='w-full'>Entrar</Button>
          </form>
        </Card>
      </Section>
    );
  }

  const giftRows = collapseGifts(gifts);
  const pendingGifts = giftRows.filter((g) => g.status === 'pix_copiado');

  const confirmations = rsvps.filter((r) => r.attending === 'yes').length;

  // Total per currency (BRL / ARS / GBP are never summed together)
  // (only gifts the guest says were paid; "copied the Pix" is pending and not summed)
  const totals = giftRows.reduce<Record<string, number>>((acc, g) => {
    if (g.status === 'pix_copiado') return acc;
    const region = CURRENCY[g.region] ? g.region : 'br';
    acc[region] = (acc[region] || 0) + Number(g.amount || 0);
    return acc;
  }, {});

  const tabClass = (active: boolean) =>
    `px-6 py-2 rounded-full text-sm uppercase tracking-wide transition-colors ${active ? 'bg-primary text-white' : 'border border-accent/30 text-foreground/70 hover:bg-accent/10'}`;

  return (
    <Section className='bg-background min-h-screen'>
      <div className='flex flex-wrap justify-between items-center gap-4 mb-8'>
        <Typography as='h2' className='mb-0'>Painel do Casamento</Typography>
        <Button variant='outline' onClick={() => window.location.reload()}>Atualizar</Button>
      </div>

      <div className='flex gap-3 mb-8' role='tablist'>
        <button role='tab' aria-selected={tab === 'gifts'} className={tabClass(tab === 'gifts')} onClick={() => setTab('gifts')}>
          Presentes ({giftRows.length})
        </button>
        <button role='tab' aria-selected={tab === 'rsvps'} className={tabClass(tab === 'rsvps')} onClick={() => setTab('rsvps')}>
          Confirmações ({rsvps.length})
        </button>
      </div>

      {tab === 'rsvps' && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-12'>
            <Card className='flex flex-col items-center text-center py-6'>
              <UserCheck className='text-primary mb-2' size={32} />
              <Typography className='text-3xl font-heading mb-0'>{confirmations}</Typography>
              <Typography className='text-xs uppercase tracking-widest opacity-60'>Confirmações</Typography>
            </Card>
            <Card className='flex flex-col items-center text-center py-6'>
              <Users className='text-primary mb-2' size={32} />
              <Typography className='text-3xl font-heading mb-0'>{rsvps.length - confirmations}</Typography>
              <Typography className='text-xs uppercase tracking-widest opacity-60'>Não vão</Typography>
            </Card>
          </div>

          <Card className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='border-b border-accent/10'>
                  <th className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40'>Convidado</th>
                  <th className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40'>Vai?</th>
                  <th className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40'>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((rsvp) => (
                  <tr key={rsvp.id} className='border-b border-accent/5 hover:bg-accent/5 transition-colors'>
                    <td className='py-4 px-4'>
                      <div className='font-medium'>{rsvp.name}</div>
                      <div className='text-xs opacity-40'>{rsvp.email}</div>
                    </td>
                    <td className='py-4 px-4'>
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${rsvp.attending === 'yes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {rsvp.attending === 'yes' ? 'Sim' : 'Não'}
                      </span>
                    </td>
                    <td className='py-4 px-4'>{rsvp.phone || '-'}</td>
                  </tr>
                ))}
                {rsvps.length === 0 && !loading && (
                  <tr>
                    <td colSpan={3} className='py-12 text-center opacity-40'>Nenhum convidado confirmado ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </>
      )}

      {tab === 'gifts' && (
        <>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-12'>
            <Card className='flex flex-col items-center text-center py-6'>
              <Gift className='text-primary mb-2' size={32} />
              <Typography className='text-3xl font-heading mb-0'>{giftRows.length}</Typography>
              <Typography className='text-xs uppercase tracking-widest opacity-60'>Presentes</Typography>
              {pendingGifts.length > 0 && (
                <Typography className='text-xs text-amber-700 mt-1'>{pendingGifts.length} copiou o Pix, sem confirmar</Typography>
              )}
            </Card>
            {(['br', 'ar', 'en'] as const).map((r) => (
              <Card key={r} className='flex flex-col items-center text-center py-6'>
                <Typography className='text-2xl font-heading mb-0'>{money(totals[r] || 0, r)}</Typography>
                <Typography className='text-xs uppercase tracking-widest opacity-60'>Total {CURRENCY[r].code}</Typography>
              </Card>
            ))}
          </div>

          <div className='flex justify-end mb-4'>
            <Button variant='outline' onClick={downloadGiftsCsv} disabled={giftRows.length === 0}>
              <Download size={16} className='mr-2 inline' />
              Baixar planilha (CSV)
            </Button>
          </div>

          <Card className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr className='border-b border-accent/10'>
                  {['Data', 'Quem presenteou', 'Presente', 'Valor', 'Pagamento', 'Status', 'Mensagem'].map((h) => (
                    <th key={h} className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40'>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {giftRows.map((g) => (
                  <tr key={g.id} className='border-b border-accent/5 hover:bg-accent/5 transition-colors align-top'>
                    <td className='py-4 px-4 text-sm whitespace-nowrap'>{new Date(g.created_at).toLocaleDateString('pt-BR')}</td>
                    <td className='py-4 px-4 font-medium'>{g.name}</td>
                    <td className='py-4 px-4 text-sm max-w-xs'>{g.items}</td>
                    <td className='py-4 px-4 tabular-nums whitespace-nowrap'>{money(g.amount, g.region)}</td>
                    <td className='py-4 px-4 text-sm'>{g.payment_method || '-'}</td>
                    <td className='py-4 px-4'>
                      <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full whitespace-nowrap ${STATUS[g.status]?.cls || 'bg-accent/10 text-foreground/60'}`}>
                        {STATUS[g.status]?.label || 'Registrado'}
                      </span>
                    </td>
                    <td className='py-4 px-4 max-w-xs'>
                      <div className='text-sm italic opacity-60 line-clamp-2' title={g.note}>{g.note || '-'}</div>
                    </td>
                  </tr>
                ))}
                {giftRows.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className='py-12 text-center opacity-40'>Nenhum presente registrado ainda.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </Section>
  );
}
