import { render, screen } from '@testing-library/react';
import { Section, Typography, Card, Button } from '../Base';
import { describe, it, expect } from 'vitest';

describe('Base Components', () => {
  it('renders Typography as h1', () => {
    render(<Typography as='h1'>Heading</Typography>);
    const heading = screen.getByText('Heading');
    expect(heading.tagName).toBe('H1');
  });

  it('renders Button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('renders Section with children', () => {
    render(<Section>Content</Section>);
    expect(screen.getByText('Content')).toBeDefined();
  });

  it('renders Card with children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeDefined();
  });
});
