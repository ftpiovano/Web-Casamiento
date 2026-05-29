import type { Metadata } from 'next';
import { siteConfig } from '@/site.config';
import { HospedagensContent } from './HospedagensContent';

export const metadata: Metadata = {
  title: `Hospedagens · Brasil 2027 | ${siteConfig.names.bride} & ${siteConfig.names.groom.br}`,
  description:
    'Categorias de quarto reservadas para os convidados no Hotel Ponta de Inhambupe — sexta a domingo.',
};

export default function HospedagensBrasilPage() {
  return <HospedagensContent />;
}
