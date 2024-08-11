import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./components/PreApp', () => () => <div>Automate Your Outbound With an All-In-One, AI-First Platform</div>);

describe('App Component', () => {
  it('renders Routings component', () => {
    render(
        <App />
    );
    expect(screen.getByText(/Automate Your Outbound With an All-In-One, AI-First Platform/i)).toBeInTheDocument();
  });
});
