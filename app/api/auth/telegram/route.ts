import { telegramAuthController } from '@/features/auth/controllers/telegram-auth-controller';

export async function POST(request: Request) {
  return telegramAuthController.handle(request);
}
