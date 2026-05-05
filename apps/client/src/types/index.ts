export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export type TelegramAuthPayload = {
  telegramId: number;
  chatId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  initData?: string;
};

export type UserProfile = {
  id: number | string;
  firstName?: string;
  lastName?: string;
  username?: string;
  telegramId?: number;
  role?: string;
  createdAt?: string;
};

export type Product = {
  id: number | string;
  name: string;
  price: number;
  imageUrl?: string;
  image?: string;
  description?: string;
  unit?: string;
};

export type CartItem = {
  productId: Product['id'];
  quantity: number;
  product: Product;
};

export type OrderStatus = 'NEW' | 'CONFIRMED' | 'DELIVERED' | string;

export type OrderItem = {
  id?: number | string;
  productId?: number | string;
  productName?: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: number | string;
  status: OrderStatus;
  createdAt?: string;
  totalAmount?: number;
  items?: OrderItem[];
};

export type Debt = {
  totalDebt: number;
  totalPaid: number;
  remainingDebt: number;
  currency?: string;
  debts?: Array<{
    id: number;
    totalAmount: number;
    paidAmount: number;
    status: string;
  }>;
};
