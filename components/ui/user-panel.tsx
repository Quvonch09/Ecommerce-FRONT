import type { UserProfile } from '@/lib/types/auth';
import { LogoutButton } from '@/components/ui/logout-button';

type UserPanelProps = {
  user: UserProfile;
};

const userCards = [
  {
    title: 'Account',
    description: 'Access Telegram-linked profile data and personalized app state.',
  },
  {
    title: 'Activity',
    description: 'Expose user-specific features without shipping admin concerns to the client.',
  },
  {
    title: 'Support',
    description: 'Keep customer-facing interactions inside the Mini App instead of the bot.',
  },
];

export function UserPanel({ user }: UserPanelProps) {
  return (
    <main className="shell">
      <section className="hero-card">
        <div className="hero-topline">
          <span className="eyebrow">User Panel</span>
          <LogoutButton />
        </div>
        <h1>Welcome, {user.firstName ?? user.username ?? 'user'}</h1>
        <p>
          The Mini App owns the user experience after launch. The bot is only responsible for
          opening the WebApp entrypoint.
        </p>
      </section>

      <section className="card-grid">
        {userCards.map((card) => (
          <article className="feature-card" key={card.title}>
            <span className="feature-tag">USER</span>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
