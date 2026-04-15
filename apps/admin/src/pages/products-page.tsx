import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductForm } from '../components/forms/product-form';
import { DataTable } from '../components/shared/data-table';
import { ErrorPanel } from '../components/shared/error-panel';
import { LoadingPanel } from '../components/shared/loading-panel';
import { PanelShell } from '../components/shared/panel-shell';
import { useToast } from '../components/shared/use-toast';
import { useAdminProducts } from '../hooks/use-admin-products';
import { createProduct, deleteProduct } from '../services/products';
import { formatCurrency } from '../utils/currency';

export const ProductsPage = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useToast();
  const { data = [], isLoading, isError, error, refetch } = useAdminProducts();

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      pushToast({ title: 'Product created', tone: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async () => {
      pushToast({ title: 'Product deleted', tone: 'success' });
      await queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    },
  });

  return (
    <div className="space-y-6">
      <PanelShell
        title="Products management"
        subtitle="Create products, track stock, and keep the catalog ready for orders."
      >
        <ProductForm
          submitLabel={createMutation.isPending ? 'Saving...' : 'Add product'}
          onSubmit={async (payload) => createMutation.mutateAsync(payload)}
        />
      </PanelShell>

      <PanelShell
        title="Catalog inventory"
        subtitle="Delete and review stock directly from the admin table."
      >
        {isLoading ? <LoadingPanel /> : null}
        {isError ? (
          <ErrorPanel
            message={error instanceof Error ? error.message : 'Failed to load products.'}
            onRetry={() => refetch()}
          />
        ) : null}
        {!isLoading && !isError ? (
          <DataTable
            headers={['Product', 'Price', 'Stock', 'Actions']}
            rows={
              <>
                {data.map((product) => (
                  <tr key={String(product.id)}>
                    <td className="px-4 py-4">
                      <p className="font-semibold text-slate-900">{product.name}</p>
                      <p className="mt-1 text-sm text-slate-500">{product.description}</p>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-700">{product.stock ?? 0}</td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => deleteMutation.mutate(product.id)}
                        className="rounded-2xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            }
          />
        ) : null}
      </PanelShell>
    </div>
  );
};
