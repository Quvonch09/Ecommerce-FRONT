import { AtSign, BadgeCheck, Phone, UserRound } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PageHeader } from '../components/shared/page-header';
import { SectionCard } from '../components/shared/section-card';
import { getMe } from '../services/auth';
import { getTelegramUser } from '../utils/telegram';

const profileRows = (
  me: Awaited<ReturnType<typeof getMe>> | undefined,
  telegramUser: ReturnType<typeof getTelegramUser>,
) => [
  {
    icon: UserRound,
    label: 'Full name',
    value:
      (me?.firstName || me?.lastName) ? [me.firstName, me.lastName].filter(Boolean).join(' ') :
      [telegramUser?.first_name, telegramUser?.last_name].filter(Boolean).join(' ') ||
      'Not provided',
  },
  {
    icon: AtSign,
    label: 'Username',
    value: me?.username || telegramUser?.username || 'Not provided',
  },
  {
    icon: BadgeCheck,
    label: 'Role',
    value: me?.role || 'Customer',
  },
];

export const ProfilePage = () => {
  const telegramUser = getTelegramUser();
  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
  });

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Profile"
        title="Your account"
        subtitle="Telegram identity and backend profile data are combined here for a compact user summary."
      />

      <SectionCard className="overflow-hidden p-0">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-5 text-white">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-3xl bg-white/20 text-xl font-extrabold">
              {telegramUser?.photo_url ? (
                <img
                  src={telegramUser.photo_url}
                  alt={telegramUser.first_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                telegramUser?.first_name?.slice(0, 1) || 'U'
              )}
            </div>
            <div>
              <h2 className="text-xl font-extrabold">
                {(me?.firstName || me?.lastName) ? [me.firstName, me.lastName].filter(Boolean).join(' ') : telegramUser?.first_name || 'Telegram User'}
              </h2>
              <p className="mt-1 text-sm text-white/75">
                Telegram ID: {telegramUser?.id || me?.telegramId || 'Unavailable'}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-5">
          {profileRows(me, telegramUser).map((row) => (
            <div key={row.label} className="flex items-start gap-3">
              <div className="rounded-2xl bg-primary-50 p-3 text-primary-700">
                <row.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-ink/40">{row.label}</p>
                <p className="mt-1 text-sm font-semibold text-ink">{row.value}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};
