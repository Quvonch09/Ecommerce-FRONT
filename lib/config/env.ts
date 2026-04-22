const getRequiredEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  backendApiBaseUrl: getRequiredEnv('BACKEND_API_BASE_URL'),
  backendTelegramAuthPath: getRequiredEnv('BACKEND_TELEGRAM_AUTH_PATH', '/auth/telegram'),
  backendMePath: getRequiredEnv('BACKEND_ME_PATH', '/user/me'),
};
