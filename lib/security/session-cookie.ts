import { cookies } from 'next/headers';

const SESSION_COOKIE = 'mini_app_jwt';

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

export const sessionCookie = {
  name: SESSION_COOKIE,
  async set(token: string) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, token, cookieOptions);
  },
  async clear() {
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
  },
  async get() {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE)?.value ?? null;
  },
};
