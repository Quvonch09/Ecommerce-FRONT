import type { Product } from '../types';
import { api } from './api';

type StockItem = {
  productId: number | string;
  quantity?: number;
};

const normalizeProducts = (data: unknown): Product[] => {
  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (data && typeof data === 'object') {
    const payload = data as { items?: Product[]; content?: Product[] };
    return payload.items || payload.content || [];
  }

  return [];
};

const syncStock = async (productId: Product['id'], quantity?: number) => {
  if (typeof quantity !== 'number') {
    return;
  }

  await api.put(`app/stock/${productId}`, {
    quantity: Math.max(0, quantity),
  });
};

export const getProducts = async () => {
  const [{ data: productsData }, { data: stockData }] = await Promise.all([
    api.get<Product[]>('app/products'),
    api.get<StockItem[]>('app/stock'),
  ]);

  const products = normalizeProducts(productsData);
  const stockByProductId = new Map(
    (Array.isArray(stockData) ? stockData : []).map((item) => [
      String(item.productId),
      item.quantity ?? 0,
    ]),
  );

  return products.map((product) => ({
    ...product,
    stock: stockByProductId.get(String(product.id)) ?? 0,
  }));
};

export const createProduct = async (payload: Omit<Product, 'id'>) => {
  const productPayload = {
    name: payload.name,
    description: payload.description,
    price: payload.price,
    costPrice: payload.costPrice ?? payload.price,
    imageUrl: payload.imageUrl,
    isActive: payload.isActive ?? true,
  };

  const { data } = await api.post<Product>('app/products', productPayload);
  await syncStock(data.id, payload.stock);
  return {
    ...data,
    stock: payload.stock ?? 0,
  };
};

export const updateProduct = async (id: Product['id'], payload: Partial<Product>) => {
  const productPayload = {
    ...(payload.name !== undefined ? { name: payload.name } : {}),
    ...(payload.description !== undefined ? { description: payload.description } : {}),
    ...(payload.price !== undefined ? { price: payload.price } : {}),
    ...(payload.costPrice !== undefined
      ? { costPrice: payload.costPrice }
      : payload.price !== undefined
        ? { costPrice: payload.price }
        : {}),
    ...(payload.imageUrl !== undefined ? { imageUrl: payload.imageUrl } : {}),
    ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
  };

  const { data } = await api.put<Product>(`app/products/${id}`, productPayload);
  await syncStock(id, payload.stock);
  return {
    ...data,
    stock: payload.stock,
  };
};

export const deleteProduct = async (id: Product['id']) => {
  const { data } = await api.delete(`app/products/${id}`);
  return data;
};
