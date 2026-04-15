export type AdminRole = 'ADMIN' | 'CLIENT' | string;

export type AdminUser = {
  id: number | string;
  fullName?: string;
  username?: string;
  phone?: string;
  role?: AdminRole;
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
  stock?: number;
  imageUrl?: string;
  image?: string;
  description?: string;
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
