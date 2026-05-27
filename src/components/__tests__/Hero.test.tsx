import { render, screen, fireEvent } from '../../test/test-utils';
import { Hero } from '../Hero';
import { describe, it, expect, beforeEach } from 'vitest';
import { siteConfig } from '@/site.config';

describe('Hero', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the bride and the BR-default groom name', () => {
    render(<Hero />);
    expect(screen.getByText(new RegExp(siteConfig.names.bride, 'i'))).toBeDefined();
    expect(screen.getByText(new RegExp(siteConfig.names.groom.br, 'i'))).toBeDefined();
  });

  it('swaps to "Tomi" when the AR region is selected', () => {
    localStorage.setItem('wedding_region', 'ar');
    render(<Hero />);
    // The provider hydrates region from localStorage on mount.
    expect(screen.getByText(/Tomi/i)).toBeDefined();
  });
});
