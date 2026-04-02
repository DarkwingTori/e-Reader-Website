import { createBrowserRouter } from 'react-router';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { DatabasePage } from './pages/DatabasePage';
import { CardDetailPage } from './pages/CardDetailPage';
import { BuilderPage } from './pages/BuilderPage';
import { SeriesPage } from './pages/SeriesPage';
import { CollectionPage } from './pages/CollectionPage';
import { AllSeriesPage } from './pages/AllSeriesPage';
import { GameCompatibilityPage } from './pages/GameCompatibilityPage';
import { EReaderPage } from './pages/EReaderPage';
import { ProfilePage } from './pages/ProfilePage';
import { AuthProvider } from './components/AuthContext';
import { Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';

function Root() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#F5F5DC]">
        <Navbar />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'database', Component: DatabasePage },
      { path: 'card/:id', Component: CardDetailPage },
      { path: 'builder', Component: BuilderPage },
      { path: 'series', Component: AllSeriesPage },
      { path: 'series/:id', Component: SeriesPage },
      { path: 'collection', Component: CollectionPage },
      { path: 'compatibility', Component: GameCompatibilityPage },
      { path: 'ereader', Component: EReaderPage },
      { path: 'profile', Component: ProfilePage },
    ],
  },
]);