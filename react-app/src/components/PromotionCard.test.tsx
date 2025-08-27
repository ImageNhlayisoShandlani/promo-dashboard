import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PromotionCard from './PromotionCard';
import type { Promotion } from '../models/promotion';
import { MemoryRouter } from 'react-router-dom';
import * as reactToastify from 'react-toastify';

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    info: vi.fn(),
  },
  ToastContainer: vi.fn(),
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('PromotionCard', () => {
  const mockPromo: Promotion = {
    id: '1',
    title: 'Test Promo',
    category: 'Test Category',
    active: true,
    startDate: new Date('2025-01-01').toDateString(),
    endDate: new Date('2025-12-31').toDateString(),
  };

  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null); 
    vi.clearAllMocks();
  });

  it('should render promo title and category', () => {
    render(
      <MemoryRouter>
        <PromotionCard promo={mockPromo} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockPromo.title)).toBeInTheDocument();
    expect(screen.getByText(mockPromo.category)).toBeInTheDocument();
  });

  it('should render active status with green color', () => {
    render(
      <MemoryRouter>
        <PromotionCard promo={mockPromo} />
      </MemoryRouter>
    );
    const status = screen.getByText('Active');
    expect(status).toBeInTheDocument();
    expect(status).toHaveStyle('color: green');
  });

  it('should render inactive status with red color', () => {
    const inactivePromo = { ...mockPromo, active: false };
    render(
      <MemoryRouter>
        <PromotionCard promo={inactivePromo} />
      </MemoryRouter>
    );
    const status = screen.getByText('Inactive');
    expect(status).toBeInTheDocument();
    expect(status).toHaveStyle('color: red');
  });

  it('should render "Subscribe" label and unchecked switch when not opted in', () => {
    render(
      <MemoryRouter>
        <PromotionCard promo={mockPromo} />
      </MemoryRouter>
    );
    const label = screen.getByText('Subscribe :');
    const switchElement = screen.getByRole('switch');
    expect(label).toBeInTheDocument();
    expect(label).not.toHaveStyle('color: green');
    expect(switchElement).not.toBeChecked();
  });

  it('should render "Subscribed" label with green color when opted in', () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify([{ ...mockPromo, id: '1' }]));
    render(
      <MemoryRouter>
        <PromotionCard promo={mockPromo} />
      </MemoryRouter>
    );
    const label = screen.getByText('Subscribed :');
    const switchElement = screen.getByRole('switch');
    expect(label).toBeInTheDocument();
    expect(label).toHaveStyle('color: green');
    expect(switchElement).toBeChecked();
  });
});