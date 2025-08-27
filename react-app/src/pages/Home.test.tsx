import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import Home from './Home';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';
import PromotionCard from '../components/PromotionCard';

// Mock dependencies
vi.mock('axios');
vi.mock('../components/Loading', () => ({ default: () => <div>Loading...</div> }));
vi.mock('../components/PromotionCard', () => ({ default: ({ promo }: { promo: any }) => <div data-testid={`promo-${promo.id}`}>{promo.title}</div> }));

const mockPromotions = [
  { id: '1', title: 'Promo 1', category: 'Casino', active: true, startDate: new Date(), endDate: new Date() },
  { id: '2', title: 'Promo 2', category: 'Sports', active: false, startDate: new Date(), endDate: new Date() },
];

const mockStore = configureStore({
  reducer: {
    promotions: (state = [], action) => {
      if (action.type === 'promotions/setPromotions') return action.payload;
      return state;
    },
  },
  preloadedState: { promotions: [] },
});

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock API response
    (axios.get as vi.Mock).mockResolvedValue({ data: mockPromotions });
    // Mock environment variable
    vi.stubEnv('VITE_API_URL', 'https://api.example.com');
  });

  it('should render loading state initially', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render hero section and filters after loading', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Welcome to Mini Dashboard')).toBeInTheDocument();
      expect(screen.getByLabelText('Category')).toBeInTheDocument();
      expect(screen.getByLabelText('Status')).toBeInTheDocument();
      expect(screen.getByLabelText('Start After')).toBeInTheDocument();
    });
  });

  it('should render promotion cards after loading', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('promo-1')).toBeInTheDocument();
      expect(screen.getByTestId('promo-2')).toBeInTheDocument();
      expect(screen.getByTestId('promo-1')).toHaveTextContent('Promo 1');
      expect(screen.getByTestId('promo-2')).toHaveTextContent('Promo 2');
    });
  });
});