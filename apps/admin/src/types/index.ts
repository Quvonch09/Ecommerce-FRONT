export type AdminRole = 'ROLE_ADMIN' | 'ROLE_CLIENT' | 'ADMIN' | 'CLIENT' | string;

export type AdminUser = {
  id: number | string;
  telegramId?: number;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string;
  username?: string;
  phone?: string;
  role?: AdminRole;
  createdAt?: string;
  totalDebt?: number;
  totalPaid?: number;
  remainingDebt?: number;
  ordersCount?: number;
};

export type AdminAuthResponse = {
  token?: string;
  accessToken?: string;
  jwt?: string;
  user?: AdminUser;
};

export type Product = {
  id: number | string;
  name: string;
  price: number;
  costPrice?: number;
  stock?: number;
  imageUrl?: string;
  image?: string;
  description?: string;
  isActive?: boolean;
};

export type OrderStatus = 'NEW' | 'CONFIRMED' | 'DELIVERED' | string;

export type OrderItem = {
  id?: number | string;
  productId?: number | string;
  productName?: string;
  quantity: number;
  price: number;
};

export type AdminOrder = {
  id: number | string;
  userId?: number | string;
  customerName?: string;
  status: OrderStatus;
  totalAmount?: number;
  createdAt?: string;
  items?: OrderItem[];
};

export type DebtRecord = {
  debtId?: number | string;
  userId: number | string;
  fullName: string;
  totalDebt: number;
  totalPaid: number;
  remainingDebt: number;
};

export type DashboardMetrics = {
  totalSales: number;
  totalOrders: number;
  totalDebt: number;
  totalUsers: number;
  revenueSeries: Array<{
    label: string;
    revenue: number;
    orders: number;
  }>;
};

export type DashboardSummary = {
  totalUsers: number;
  totalSellers: number;
  totalOrders: number;
  totalProducts: number;
  revenue: number;
  estimatedCost: number;
  estimatedProfit: number;
  debtOutstanding: number;
  topProducts?: Array<{
    productId: number | string;
    productName: string;
    soldQuantity: number;
  }>;
  lowStockProducts?: Array<{
    id: number | string;
    productId: number | string;
    productName: string;
    quantity: number;
    minThreshold?: number;
    lowStock: boolean;
  }>;
};
