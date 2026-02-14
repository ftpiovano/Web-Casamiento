import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../LanguageContext';
import { describe, it, expect } from 'vitest';

const TestComponent = () => {
  const { region, setRegion, config } = useLanguage();
  return (
    <div>
      <span data-testid='region'>{region}</span>
      <span data-testid='title'>{config.content.welcomeTitle}</span>
      <button onClick={() => setRegion('ar')}>Switch to AR</button>
    </div>
  );
};

describe('LanguageContext', () => {
  it('provides default region and allows switching', () => {
    render(
      <LanguageProvider>
        <TestComponent />
      </LanguageProvider>
    );
    
    expect(screen.getByTestId('region').textContent).toBe('br');
    expect(screen.getByTestId('title').textContent).toBe('Bem-vindos');
    
    fireEvent.click(screen.getByText('Switch to AR'));
    
    expect(screen.getByTestId('region').textContent).toBe('ar');
    expect(screen.getByTestId('title').textContent).toBe('Bienvenidos');
  });
});
