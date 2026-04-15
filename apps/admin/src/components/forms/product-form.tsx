import { useState } from 'react';
import type { Product } from '../../types';

type ProductInput = Omit<Product, 'id'>;

const initialState: ProductInput = {
  name: '',
  price: 0,
  stock: 0,
  imageUrl: '',
  description: '',
};

export const ProductForm = ({
  initialValue,
  submitLabel,
  onSubmit,
}: {
  initialValue?: ProductInput;
  submitLabel: string;
  onSubmit: (payload: ProductInput) => Promise<void> | void;
}) => {
  const [form, setForm] = useState<ProductInput>(initialValue ?? initialState);

  return (
    <form
      className="grid gap-4 md:grid-cols-2"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit(form);
        setForm(initialValue ?? initialState);
      }}
    >
      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Product name</span>
        <input
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
          required
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Price</span>
        <input
          type="number"
          value={form.price}
          onChange={(event) => setForm({ ...form, price: Number(event.target.value) })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
          required
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Stock</span>
        <input
          type="number"
          value={form.stock}
          onChange={(event) => setForm({ ...form, stock: Number(event.target.value) })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        />
      </label>
      <label className="space-y-2">
        <span className="text-sm font-semibold text-slate-700">Image URL</span>
        <input
          value={form.imageUrl}
          onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        />
      </label>
      <label className="space-y-2 md:col-span-2">
        <span className="text-sm font-semibold text-slate-700">Description</span>
        <textarea
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          className="min-h-28 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-500"
        />
      </label>
      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};
