import { NextResponse } from 'next/server';
import { sessionCookie } from '@/lib/security/session-cookie';

export async function POST() {
  await sessionCookie.clear();
  return NextResponse.json({ ok: true });
}
