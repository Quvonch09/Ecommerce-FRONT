import axios from 'axios';

export const getErrorMessage = (error: unknown, fallback = 'Something went wrong') => {
  if (axios.isAxiosError(error)) {
    const apiMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data?.details;

    return apiMessage || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};
