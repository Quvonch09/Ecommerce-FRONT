import { useProducts } from '../hooks/use-products';
import { ProductCard } from '../components/products/product-card';
import { PageHeader } from '../components/shared/page-header';
import { LoadingGrid } from '../components/shared/loading-grid';
import { ErrorState } from '../components/shared/error-state';
import { useCartContext } from '../providers/cart-provider';
import { useToast } from '../components/feedback/use-toast';
import { notifyTelegram } from '../utils/telegram';

export const HomePage = () => {
  const { data: products = [], isLoading, isError, error, refetch } = useProducts();
  const { addItem } = useCartContext();
  const { pushToast } = useToast();

  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Pick products fast"
        subtitle="Large cards, quick actions, and a cart built for Telegram-first order entry."
      />

      {isLoading ? <LoadingGrid /> : null}

      {isError ? (
        <ErrorState
          message={error instanceof Error ? error.message : 'Could not load products.'}
          onRetry={() => refetch()}
        />
      ) : null}

      {!isLoading && !isError ? (
        <div className="grid gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={(selectedProduct) => {
                addItem(selectedProduct);
                notifyTelegram('success');
                pushToast({
                  title: 'Added to cart',
                  description: `${selectedProduct.name} is ready for checkout.`,
                  tone: 'success',
                });
              }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
