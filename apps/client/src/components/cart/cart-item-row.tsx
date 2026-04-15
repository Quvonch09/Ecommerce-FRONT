import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem } from '../../types';
import { formatCurrency } from '../../utils/currency';

export const CartItemRow = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}) => (
  <div className="flex items-center gap-3 rounded-[24px] bg-white p-3 shadow-card">
    <div className="h-16 w-16 overflow-hidden rounded-2xl bg-primary-50">
      {item.product.imageUrl || item.product.image ? (
        <img
          src={item.product.imageUrl || item.product.image}
          alt={item.product.name}
          className="h-full w-full object-cover"
        />
      ) : null}
    </div>
    <div className="min-w-0 flex-1">
      <h3 className="truncate text-sm font-bold text-ink">{item.product.name}</h3>
      <p className="mt-1 text-sm text-ink/60">{formatCurrency(item.product.price)}</p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onDecrease}
          className="rounded-xl border border-black/5 p-2 text-ink"
          aria-label="Decrease quantity"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
        <button
          type="button"
          onClick={onIncrease}
          className="rounded-xl border border-black/5 p-2 text-ink"
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="flex flex-col items-end justify-between gap-3 self-stretch">
      <button
        type="button"
        onClick={onRemove}
        className="rounded-xl p-2 text-coral"
        aria-label="Remove item"
      >
        <Trash2 className="h-4 w-4" />
      </button>
      <p className="text-sm font-extrabold text-ink">
        {formatCurrency(item.product.price * item.quantity)}
      </p>
    </div>
  </div>
);
