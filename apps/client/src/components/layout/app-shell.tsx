import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BottomNav } from './bottom-nav';
import { useTelegramBootstrap } from '../../hooks/use-telegram-bootstrap';
import { FullScreenLoader } from '../shared/full-screen-loader';

export const AppShell = () => {
  const location = useLocation();
  const { isInitializing } = useTelegramBootstrap();

  if (isInitializing) {
    return <FullScreenLoader label="Connecting to your store..." />;
  }

  return (
    <div className="min-h-screen bg-shell text-ink">
      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <main className="flex-1 px-4 pb-28 pt-4 safe-pb safe-pt">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="page-enter"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNav />
      </div>
    </div>
  );
};
