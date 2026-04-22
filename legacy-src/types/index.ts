export type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
};

export type UserProfile = {
  id: number | string;
  firstName?: string;
  lastName?: string;
  username?: string;
  telegramId?: number;
  role?: 'ROLE_ADMIN' | 'ROLE_CLIENT' | string;
  balance?: number;
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

export type OrderResponse = {
  id: number | string;
  userId: number | string;
  totalAmount: number;
  status: 'NEW' | 'CONFIRMED' | 'DELIVERED' | 'CANCELLED' | string;
  createdAt: string;
  items: OrderItem[];
};

export type DebtResponse = {
  id: number | string;
  userId: number | string;
  totalAmount: number;
  paidAmount: number;
  status: 'OPEN' | 'CLOSED' | string;
  createdAt: string;
};

export type Debt = {
  totalDebt: number;
  totalPaid: number;
  remainingDebt: number;
  currency?: string;
  items?: DebtResponse[];
};

export type PaymentRequest = {
  debtId: number | string;
  amount: number;
};

export type PaymentResponse = {
  id: number | string;
  debtId: number | string;
  amount: number;
  createdAt: string;
};
