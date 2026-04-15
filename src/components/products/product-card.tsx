import { Plus } from 'lucide-react';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils/currency';

export const ProductCard = ({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) => {
  const image = product.imageUrl || product.image;

  return (
    <article className="overflow-hidden rounded-[30px] bg-white shadow-card">
      <div className="relative h-44 overflow-hidden bg-primary-50">
        {image ? (
          <img src={image} alt={product.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700">
            <span className="rounded-full bg-white/60 px-4 py-2 text-sm font-bold">
              {product.unit || 'Product'}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-ink">{product.name}</h3>
            {product.description ? (
              <p className="mt-1 line-clamp-2 text-sm leading-5 text-ink/60">
                {product.description}
              </p>
            ) : null}
          </div>
          <p className="whitespace-nowrap rounded-full bg-primary-50 px-3 py-1 text-sm font-bold text-primary-700">
            {formatCurrency(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAdd(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          <Plus className="h-4 w-4" />
          Add to cart
        </button>
      </div>
    </article>
  );
};
