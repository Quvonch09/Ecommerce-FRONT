import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CartItemRow } from '../components/cart/cart-item-row';
import { EmptyState } from '../components/shared/empty-state';
import { PageHeader } from '../components/shared/page-header';
import { SectionCard } from '../components/shared/section-card';
import { useToast } from '../components/feedback/use-toast';
import { useCartContext } from '../providers/cart-provider';
import { createOrder } from '../services/orders';
import { formatCurrency } from '../utils/currency';
import { notifyTelegram } from '../utils/telegram';

export const CartPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { pushToast } = useToast();
  const { items, total, clearCart, removeItem, updateQuantity } = useCartContext();

  const placeOrderMutation = useMutation({
    mutationFn: () => createOrder(items),
    onSuccess: async () => {
      clearCart();
      notifyTelegram('success');
      pushToast({
        title: 'Order placed',
        description: 'Your order has been sent successfully.',
        tone: 'success',
      });
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      navigate('/orders');
    },
  });

  if (!items.length) {
    return (
      <div>
        <PageHeader
          eyebrow="Cart"
          title="Your cart is empty"
          subtitle="Add products from the catalog, then place the order in one tap."
        />
        <EmptyState
          title="Nothing here yet"
          description="When you add products, they will appear here with quantity controls and live totals."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        eyebrow="Cart"
        title="Review before sending"
        subtitle="Update quantities, check totals, then submit the order to the backend."
      />

      <div className="space-y-3">
        {items.map((item) => (
          <CartItemRow
            key={String(item.productId)}
            item={item}
            onIncrease={() => updateQuantity(item.productId, item.quantity + 1)}
            onDecrease={() => updateQuantity(item.productId, item.quantity - 1)}
            onRemove={() => removeItem(item.productId)}
          />
        ))}
      </div>

      <SectionCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink/60">Total amount</p>
            <p className="mt-1 text-2xl font-extrabold text-ink">{formatCurrency(total)}</p>
          </div>
          <div className="rounded-2xl bg-primary-50 px-4 py-2 text-right">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-700/70">
              Items
            </p>
            <p className="text-lg font-bold text-primary-700">{items.length}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => placeOrderMutation.mutate()}
          disabled={placeOrderMutation.isPending}
          className="mt-5 w-full rounded-2xl bg-primary-600 px-4 py-4 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {placeOrderMutation.isPending ? 'Placing order...' : 'Place Order'}
        </button>
      </SectionCard>
    </div>
  );
};
