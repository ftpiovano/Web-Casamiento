import type { Metadata } from 'next';
import { siteConfig } from '@/site.config';
import { BuenosAiresContent } from './BuenosAiresContent';

export const metadata: Metadata = {
  title: `Guia de Buenos Aires | ${siteConfig.names.bride} & ${siteConfig.names.groom.br}`,
  description:
    'Onde comer, o que ver e como se mover em Buenos Aires durante a sua visita ao casamento civil.',
};

export default function BuenosAiresPage() {
  return <BuenosAiresContent />;
}
