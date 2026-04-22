import { House, ShoppingCart, ReceiptText, WalletCards, UserRound } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../../providers/cart-provider';

const items = [
  { to: '/', label: 'Shop', icon: House },
  { to: '/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/orders', label: 'Orders', icon: ReceiptText },
  { to: '/debt', label: 'Debt', icon: WalletCards },
  { to: '/profile', label: 'Profile', icon: UserRound },
];

export const BottomNav = () => {
  const { itemCount } = useCartContext();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-md border-t border-white/40 bg-white/85 px-3 pb-3 pt-2 backdrop-blur-xl safe-pb">
      <ul className="grid grid-cols-5 gap-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `relative flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold transition ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-ink/55 hover:bg-black/5 hover:text-ink'
                }`
              }
            >
              <Icon className="mb-1 h-5 w-5" />
              {label}
              {to === '/cart' && itemCount > 0 ? (
                <span className="absolute right-2 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1 text-[10px] text-white">
                  {itemCount}
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
