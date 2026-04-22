import type { UserProfile } from '@/lib/types/auth';
import { LogoutButton } from '@/components/ui/logout-button';

type AdminPanelProps = {
  user: UserProfile;
};

const adminCards = [
  {
    title: 'Dashboard',
    description: 'Track platform health, active sessions, and commercial performance.',
  },
  {
    title: 'Manage users',
    description: 'Review Telegram-linked accounts, roles, and lifecycle actions.',
  },
  {
    title: 'Manage data',
    description: 'Operate catalog, operational entities, and internal control records.',
  },
];

export function AdminPanel({ user }: AdminPanelProps) {
  return (
    <main className="shell">
      <section className="hero-card">
        <div className="hero-topline">
          <span className="eyebrow">Admin Panel</span>
          <LogoutButton />
        </div>
        <h1>Control center for {user.firstName ?? user.username ?? 'administrator'}</h1>
        <p>
          JWT session is established from Telegram WebApp identity, then the interface is selected
          from `/api/user/me`.
        </p>
      </section>

      <section className="card-grid">
        {adminCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <span className="feature-tag">ADMIN</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
