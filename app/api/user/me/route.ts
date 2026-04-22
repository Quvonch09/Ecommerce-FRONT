import { userController } from '@/features/user/controllers/user-controller';

export async function GET() {
  return userController.getCurrentUser();
}
