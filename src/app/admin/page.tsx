'use client';

import { useState, useEffect } from 'react';
import { Section, Typography, Card, Button } from '@/components/Base';
import { getRSVPs, validateAdminPassword } from '@/app/actions';
import { Users, UserCheck, MessageSquare } from 'lucide-react';

/**
 * Admin dashboard page for tracking guest confirmations.
 * @return {JSX.Element} The rendered admin page.
 */
export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await validateAdminPassword(password);
    if (result.success) {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        const result = await getRSVPs();
        if (result.success) {
          setRsvps(result.data || []);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [isAuthenticated]);

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

  const totals = rsvps.reduce(
    (acc, curr) => {
      if (curr.attending === 'yes') {
        acc.adults += curr.adults || 0;
        acc.kids += curr.kids || 0;
        acc.confirmations += 1;
      }
      return acc;
    },
    { adults: 0, kids: 0, confirmations: 0 }
  );

  return (
    <Section className='bg-background min-h-screen'>
      <div className='flex justify-between items-center mb-12'>
        <Typography as='h2' className='mb-0'>Dashboard de Convidados</Typography>
        <Button variant='outline' onClick={() => window.location.reload()}>Atualizar</Button>
      </div>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
        <Card className='flex flex-col items-center text-center py-6'>
          <UserCheck className='text-primary mb-2' size={32} />
          <Typography className='text-3xl font-heading mb-0'>{totals.confirmations}</Typography>
          <Typography className='text-xs uppercase tracking-widest opacity-60'>Confirmações</Typography>
        </Card>
        <Card className='flex flex-col items-center text-center py-6'>
          <Users className='text-primary mb-2' size={32} />
          <Typography className='text-3xl font-heading mb-0'>{totals.adults}</Typography>
          <Typography className='text-xs uppercase tracking-widest opacity-60'>Total Adultos</Typography>
        </Card>
        <Card className='flex flex-col items-center text-center py-6'>
          <Users className='text-primary/60 mb-2' size={32} />
          <Typography className='text-3xl font-heading mb-0'>{totals.kids}</Typography>
          <Typography className='text-xs uppercase tracking-widest opacity-60'>Total Crianças</Typography>
        </Card>
      </div>

      {/* Guest List Table */}
      <Card className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b border-accent/10'>
              <th className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40'>Convidado</th>
              <th className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40'>Vai?</th>
              <th className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40 text-center'>Ad/Cr</th>
              <th className='py-4 px-4 text-xs uppercase tracking-widest font-bold opacity-40'>Mensagem</th>
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
                <td className='py-4 px-4 text-center tabular-nums'>
                  {rsvp.adults} / {rsvp.kids}
                </td>
                <td className='py-4 px-4 max-w-xs'>
                  <div className='text-sm italic opacity-60 line-clamp-2' title={rsvp.notes}>
                    {rsvp.notes || '-'}
                  </div>
                </td>
              </tr>
            ))}
            {rsvps.length === 0 && !loading && (
              <tr>
                <td colSpan={4} className='py-12 text-center opacity-40'>Nenhum convidado confirmado ainda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </Section>
  );
}
