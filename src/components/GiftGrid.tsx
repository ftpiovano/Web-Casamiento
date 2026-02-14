'use client';

import { useState } from 'react';
import { Section, Typography, Card, Button } from './Base';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Interface for a gift item.
 */
interface GiftItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

/**
 * Mock data for the gift registry.
 */
const mockGifts: GiftItem[] = [
  { id: 1, name: 'Jantar Romântico em Buenos Aires', description: 'Um jantar especial para o casal.', price: 500, category: 'Experiência' },
  { id: 2, name: 'Passagens Aéreas', description: 'Ajude-nos a chegar ao nosso destino.', price: 2000, category: 'Viagem' },
  { id: 3, name: 'Hospedagem em Resort', description: 'Uma noite de descanso e luxo.', price: 800, category: 'Viagem' },
  { id: 4, name: 'Passeio de Barco', description: 'Explorando as águas cristalinas.', price: 300, category: 'Experiência' },
  { id: 5, name: 'Jogo de Pratos', description: 'Para nossa nova casa.', price: 250, category: 'Casa' },
  { id: 6, name: 'Cafeteira Espresso', description: 'Para começar o dia bem.', price: 600, category: 'Casa' },
];

/**
 * Component for displaying the sortable gift registry.
 * @return {JSX.Element} The rendered gift grid.
 */
export function GiftGrid() {
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');

  const sortedGifts = [...mockGifts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return a.name.localeCompare(b.name);
  });

  return (
    <Section id='gifts' className='bg-accent/5'>
      <div className='flex flex-col md:flex-row justify-between items-center mb-12 gap-6'>
        <Typography as='h2' className='mb-0'>Lista de Presentes</Typography>
        
        <div className='flex items-center gap-4'>
          <span className='text-sm uppercase tracking-widest text-foreground/40 font-medium'>Ordenar por:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'price-asc' | 'price-desc' | 'name')}
            className='bg-background border border-accent/20 rounded-full px-4 py-2 text-sm outline-none focus:border-primary/50 transition-colors'
          >
            <option value='name'>Nome</option>
            <option value='price-asc'>Menor Preço</option>
            <option value='price-desc'>Maior Preço</option>
          </select>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <AnimatePresence mode='popLayout'>
          {sortedGifts.map((gift) => (
            <motion.div
              key={gift.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <Card className='h-full flex flex-col'>
                <div className='mb-4'>
                  <span className='text-[10px] uppercase tracking-[0.2em] text-primary font-bold bg-primary/10 px-3 py-1 rounded-full'>
                    {gift.category}
                  </span>
                </div>
                <Typography as='h4' className='mb-2'>{gift.name}</Typography>
                <Typography className='text-sm mb-6 flex-grow'>{gift.description}</Typography>
                <div className='flex justify-between items-center mt-auto border-t border-accent/10 pt-6'>
                  <span className='text-xl font-heading text-primary'>
                    R$ {gift.price.toLocaleString('pt-BR')}
                  </span>
                  <Button variant='outline' className='px-6 py-2 text-xs'>
                    Presentear
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
