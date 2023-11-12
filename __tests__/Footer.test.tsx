import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '../app/components/Footer';


describe('Footer Component', () => {
  test('renders Footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByText('Footer'); // Passen Sie diesen Selector an den tatsächlichen Inhalt Ihrer Komponente an
    expect(footerElement).toBeTruthy();
    expect(footerElement).toBeInTheDocument();
  });
});
