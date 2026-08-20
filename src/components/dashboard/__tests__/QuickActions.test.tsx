import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import QuickActions from '../QuickActions';

function renderQuickActions() {
  return render(
    <I18nextProvider i18n={i18n}>
      <QuickActions />
    </I18nextProvider>,
  );
}

describe('QuickActions', () => {
  it('renders all three quick action buttons', () => {
    renderQuickActions();

    expect(screen.getByRole('button', { name: 'View Network Status' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stake VERO Tokens' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Rewards History' })).toBeInTheDocument();
  });

  it('marks every button as disabled and announces Coming soon', () => {
    renderQuickActions();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
    buttons.forEach((button) => {
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    // Each action label shows a "Coming soon" hint instead of an arrow icon
    expect(screen.getAllByText('Coming soon')).toHaveLength(3);
  });

  it('does not trigger any action when clicked', async () => {
    const user = userEvent.setup();
    renderQuickActions();

    const stakeButton = screen.getByRole('button', { name: 'Stake VERO Tokens' });
    await user.click(stakeButton);

    // The button stays disabled and the page is unchanged (no navigation, no state change)
    expect(screen.getByRole('button', { name: 'Stake VERO Tokens' })).toBeDisabled();
    expect(screen.getAllByText('Coming soon')).toHaveLength(3);
  });
});